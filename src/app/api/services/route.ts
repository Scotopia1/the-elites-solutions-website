import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { services } from '@/db/schema/postgres';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let query = db.select().from(services).where(eq(services.isActive, true));

    if (featured === 'true') {
      query = query.where(eq(services.isFeatured, true));
    }

    const allServices = await query;

    return NextResponse.json({
      success: true,
      data: allServices,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}
