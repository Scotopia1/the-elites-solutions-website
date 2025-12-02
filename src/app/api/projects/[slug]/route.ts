import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { projects, services } from '@/db/schema/postgres';
import { eq, and, ne, inArray } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch project by slug
    const project = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.isPublished, true)))
      .limit(1);

    if (!project.length) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    // Fetch services used in this project
    let usedServices: any[] = [];
    if (project[0].servicesUsed && project[0].servicesUsed.length > 0) {
      try {
        usedServices = await db
          .select()
          .from(services)
          .where(inArray(services.id, project[0].servicesUsed));
      } catch (e) {
        console.log('Could not fetch services:', e);
      }
    }

    // Fetch related projects (same technologies or services)
    let relatedProjects: any[] = [];
    try {
      relatedProjects = await db
        .select()
        .from(projects)
        .where(and(eq(projects.isPublished, true), ne(projects.id, project[0].id)))
        .limit(3);
    } catch (e) {
      console.log('Could not fetch related projects:', e);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...project[0],
        services: usedServices,
        relatedProjects,
      },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
