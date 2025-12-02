import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { projects } from '@/db/schema/postgres';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let query = db.select().from(projects).where(eq(projects.isPublished, true));

    if (featured === 'true') {
      query = query.where(eq(projects.isFeatured, true));
    }

    const allProjects = await query;

    return NextResponse.json({
      success: true,
      data: allProjects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}
