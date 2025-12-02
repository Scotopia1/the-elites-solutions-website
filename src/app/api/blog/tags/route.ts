import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { blogTags, blogPostTags } from '@/db/schema/postgres';
import { sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get all tags with post count
    const tags = await db
      .select({
        tag: blogTags,
        postCount: sql<number>`count(${blogPostTags.postId})::int`,
      })
      .from(blogTags)
      .leftJoin(blogPostTags, sql`${blogPostTags.tagId} = ${blogTags.id}`)
      .groupBy(blogTags.id)
      .orderBy(sql`count(${blogPostTags.postId}) DESC`);

    return NextResponse.json({
      success: true,
      data: tags.map(t => ({
        ...t.tag,
        postCount: t.postCount,
      })),
    });
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
