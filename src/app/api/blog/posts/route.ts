import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogPosts, blogAuthors, blogCategories, blogTags, blogPostTags } from '@/db/schema/postgres';
import { eq, and, desc, sql, ilike, or, inArray } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const categorySlug = searchParams.get('category') || '';
    const tagSlug = searchParams.get('tag') || '';
    const featured = searchParams.get('featured') === 'true';

    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = eq(blogPosts.isPublished, true);

    // Get posts with author and category
    let postsQuery = db
      .select({
        post: blogPosts,
        author: blogAuthors,
        category: blogCategories,
      })
      .from(blogPosts)
      .leftJoin(blogAuthors, eq(blogPosts.authorId, blogAuthors.id))
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(whereConditions)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    const posts = await postsQuery;

    // Filter by search if provided
    let filteredPosts = posts;
    if (search) {
      filteredPosts = posts.filter(p => {
        const title = p.post.title as { en: string; fr: string; ar: string };
        const content = p.post.content as { en: string; fr: string; ar: string };
        const searchLower = search.toLowerCase();
        return (
          title.en.toLowerCase().includes(searchLower) ||
          title.fr?.toLowerCase().includes(searchLower) ||
          content.en.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filter by featured if requested
    if (featured) {
      filteredPosts = filteredPosts.filter(p => p.post.isFeatured);
    }

    // Get tags for each post
    const postsWithTags = await Promise.all(
      filteredPosts.map(async (item) => {
        const postTags = await db
          .select({ tag: blogTags })
          .from(blogPostTags)
          .leftJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, item.post.id));

        return {
          ...item.post,
          author: item.author,
          category: item.category,
          tags: postTags.map(pt => pt.tag).filter(Boolean),
        };
      })
    );

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true));

    const total = Number(totalResult[0]?.count || 0);

    return NextResponse.json({
      success: true,
      data: postsWithTags,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
