import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogAuthors, blogPosts, blogCategories } from '@/db/schema/postgres';
import { eq, and, desc, sql } from 'drizzle-orm';

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

    // Get author
    const author = await db
      .select()
      .from(blogAuthors)
      .where(and(eq(blogAuthors.slug, slug), eq(blogAuthors.isActive, true)))
      .limit(1);

    if (!author.length) {
      return NextResponse.json(
        { success: false, message: 'Author not found' },
        { status: 404 }
      );
    }

    // Get total posts count for this author
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.authorId, author[0].id),
          eq(blogPosts.isPublished, true)
        )
      );

    // Get author's posts
    const posts = await db
      .select({
        post: blogPosts,
        category: blogCategories,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(
        and(
          eq(blogPosts.authorId, author[0].id),
          eq(blogPosts.isPublished, true)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    const totalPosts = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: {
        author: author[0],
        posts: posts.map(p => ({
          ...p.post,
          category: p.category,
        })),
        totalPosts,
        pagination: {
          page,
          limit,
          total: totalPosts,
          totalPages: Math.ceil(totalPosts / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching author:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch author' },
      { status: 500 }
    );
  }
}
