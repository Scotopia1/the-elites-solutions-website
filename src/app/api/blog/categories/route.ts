import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogCategories, blogPosts } from '@/db/schema/postgres';
import { eq, sql, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get all active categories with post count
    const categories = await db
      .select({
        category: blogCategories,
        postCount: sql<number>`count(${blogPosts.id})::int`,
      })
      .from(blogCategories)
      .leftJoin(
        blogPosts,
        eq(blogPosts.categoryId, blogCategories.id)
      )
      .where(eq(blogCategories.isActive, true))
      .groupBy(blogCategories.id)
      .orderBy(asc(blogCategories.orderIndex));

    return NextResponse.json({
      success: true,
      data: categories.map(c => ({
        ...c.category,
        postCount: c.postCount,
      })),
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
