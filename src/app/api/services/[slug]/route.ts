import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { services, projects } from '@/db/schema/postgres';
import { eq, and, arrayContains } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch service by slug
    const service = await db
      .select()
      .from(services)
      .where(and(eq(services.slug, slug), eq(services.isActive, true)))
      .limit(1);

    if (!service.length) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Fetch related projects that use this service
    let relatedProjects: any[] = [];
    try {
      relatedProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.isPublished, true))
        .limit(3);
    } catch (e) {
      // Projects table might not exist yet, gracefully handle
      console.log('Could not fetch related projects:', e);
    }

    // Get other services for "Other Services" section
    const otherServices = await db
      .select()
      .from(services)
      .where(and(eq(services.isActive, true)))
      .limit(4);

    return NextResponse.json({
      success: true,
      data: {
        ...service[0],
        relatedProjects,
        otherServices: otherServices.filter((s) => s.id !== service[0].id).slice(0, 3),
      },
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
