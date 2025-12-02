import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogTags, blogPosts, blogAuthors, blogPostTags } from '@/db/schema/postgres';
import { eq, and, desc, inArray } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get tag
    const tag = await db
      .select()
      .from(blogTags)
      .where(eq(blogTags.slug, slug))
      .limit(1);

    if (!tag.length) {
      return NextResponse.json(
        { success: false, message: 'Tag not found' },
        { status: 404 }
      );
    }

    // Get post IDs with this tag
    const postTagRelations = await db
      .select({ postId: blogPostTags.postId })
      .from(blogPostTags)
      .where(eq(blogPostTags.tagId, tag[0].id));

    const postIds = postTagRelations.map(pt => pt.postId);

    if (!postIds.length) {
      return NextResponse.json({
        success: true,
        data: {
          tag: tag[0],
          posts: [],
        },
      });
    }

    // Get posts with these IDs
    const posts = await db
      .select({
        post: blogPosts,
        author: blogAuthors,
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .where(
        and(
          inArray(blogPosts.id, postIds),
          eq(blogPosts.isPublished, true)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      data: {
        tag: tag[0],
        posts: posts.map(p => ({
          ...p.post,
          author: p.author,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching tag posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tag posts' },
      { status: 500 }
    );
  }
}
