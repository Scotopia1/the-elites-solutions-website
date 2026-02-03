import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getAllCategories } from '@/lib/data/projects';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const options = searchParams.get('options');

  // Return filter options for ProjectFilters component
  if (options === 'true') {
    const projects = getAllProjects();

    // Extract unique values
    const categories = getAllCategories();
    const projectScales = [...new Set(projects.map(p => p.projectScale))];
    const technologies = [...new Set(projects.flatMap(p => p.technologies))].sort();

    return NextResponse.json({
      success: true,
      filterOptions: {
        categories,
        projectScales,
        technologies
      }
    });
  }

  // Default: return all projects
  const projects = getAllProjects();
  return NextResponse.json({
    success: true,
    projects
  });
}
