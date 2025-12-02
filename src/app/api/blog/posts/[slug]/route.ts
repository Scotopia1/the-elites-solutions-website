import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogPosts, blogAuthors, blogCategories, blogTags, blogPostTags, blogComments } from '@/db/schema/postgres';
import { eq, and, ne, desc, isNull } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch post by slug with author and category
    const result = await db
      .select({
        post: blogPosts,
        author: blogAuthors,
        category: blogCategories,
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
      .limit(1);

    if (!result.length) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    const postData = result[0];

    // Increment view count
    await db
      .update(blogPosts)
      .set({ viewCount: (postData.post.viewCount || 0) + 1 })
      .where(eq(blogPosts.id, postData.post.id));

    // Get tags for this post
    const postTags = await db
      .select({ tag: blogTags })
      .from(blogPostTags)
      .leftJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
      .where(eq(blogPostTags.postId, postData.post.id));

    // Get approved comments (top-level only, replies will be nested)
    const comments = await db
      .select()
      .from(blogComments)
      .where(
        and(
          eq(blogComments.postId, postData.post.id),
          eq(blogComments.isApproved, true),
          isNull(blogComments.parentId)
        )
      )
      .orderBy(desc(blogComments.createdAt));

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await db
          .select()
          .from(blogComments)
          .where(
            and(
              eq(blogComments.parentId, comment.id),
              eq(blogComments.isApproved, true)
            )
          )
          .orderBy(blogComments.createdAt);
        return { ...comment, replies };
      })
    );

    // Get related posts (same category or author)
    let relatedPosts: any[] = [];
    try {
      relatedPosts = await db
        .select({
          post: blogPosts,
          author: blogAuthors,
        })
        .from(blogPosts)
        .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
        .where(
          and(
            eq(blogPosts.isPublished, true),
            ne(blogPosts.id, postData.post.id)
          )
        )
        .orderBy(desc(blogPosts.publishedAt))
        .limit(3);
    } catch (e) {
      console.log('Could not fetch related posts:', e);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...postData.post,
        author: postData.author,
        category: postData.category,
        tags: postTags.map(pt => pt.tag).filter(Boolean),
        comments: commentsWithReplies,
        relatedPosts: relatedPosts.map(rp => ({
          ...rp.post,
          author: rp.author,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
