import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogCategories, blogPosts, blogAuthors } from '@/db/schema/postgres';
import { eq, and, desc } from 'drizzle-orm';

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

    // Get category
    const category = await db
      .select()
      .from(blogCategories)
      .where(and(eq(blogCategories.slug, slug), eq(blogCategories.isActive, true)))
      .limit(1);

    if (!category.length) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    // Get posts in this category
    const posts = await db
      .select({
        post: blogPosts,
        author: blogAuthors,
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .where(
        and(
          eq(blogPosts.categoryId, category[0].id),
          eq(blogPosts.isPublished, true)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      data: {
        category: category[0],
        posts: posts.map(p => ({
          ...p.post,
          author: p.author,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch category posts' },
      { status: 500 }
    );
  }
}
