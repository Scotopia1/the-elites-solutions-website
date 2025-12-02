import { NextResponse } from 'next/server';
import { db } from '@/lib/database/postgres';
import { services, projects, inquiries, bookings, users } from '@/db/schema/postgres';
import { eq, count, gte, sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Get current month start date
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Parallel queries for better performance
    const [
      totalInquiriesResult,
      totalInquiriesThisMonthResult,
      totalInquiriesLastMonthResult,
      activeProjectsResult,
      totalProjectsResult,
      bookingsThisMonthResult,
      bookingsLastMonthResult,
      totalUsersResult,
      recentInquiriesResult,
    ] = await Promise.all([
      // Total inquiries
      db.select({ count: count() }).from(inquiries),

      // Inquiries this month
      db
        .select({ count: count() })
        .from(inquiries)
        .where(gte(inquiries.createdAt, firstDayOfMonth)),

      // Inquiries last month
      db
        .select({ count: count() })
        .from(inquiries)
        .where(gte(inquiries.createdAt, firstDayOfLastMonth)),

      // Active projects
      db.select({ count: count() }).from(projects).where(eq(projects.isPublished, true)),

      // Total projects
      db.select({ count: count() }).from(projects),

      // Bookings this month
      db
        .select({ count: count() })
        .from(bookings)
        .where(gte(bookings.createdAt, firstDayOfMonth)),

      // Bookings last month
      db
        .select({ count: count() })
        .from(bookings)
        .where(gte(bookings.createdAt, firstDayOfLastMonth)),

      // Total users
      db.select({ count: count() }).from(users),

      // Recent inquiries (last 5)
      db
        .select({
          id: inquiries.id,
          name: inquiries.name,
          email: inquiries.email,
          type: inquiries.type,
          createdAt: inquiries.createdAt,
        })
        .from(inquiries)
        .orderBy(sql`${inquiries.createdAt} DESC`)
        .limit(5),
    ]);

    const totalInquiries = totalInquiriesResult[0]?.count || 0;
    const inquiriesThisMonth = totalInquiriesThisMonthResult[0]?.count || 0;
    const inquiriesLastMonth = totalInquiriesLastMonthResult[0]?.count || 0;
    const activeProjects = activeProjectsResult[0]?.count || 0;
    const totalProjects = totalProjectsResult[0]?.count || 0;
    const bookingsThisMonth = bookingsThisMonthResult[0]?.count || 0;
    const bookingsLastMonth = bookingsLastMonthResult[0]?.count || 0;
    const totalUsers = totalUsersResult[0]?.count || 0;

    // Calculate percentage changes
    const inquiriesChange =
      inquiriesLastMonth > 0
        ? Math.round(((inquiriesThisMonth - inquiriesLastMonth) / inquiriesLastMonth) * 100)
        : 0;

    const bookingsChange =
      bookingsLastMonth > 0
        ? Math.round(((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100)
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalInquiries,
          inquiriesThisMonth,
          inquiriesChange,
          activeProjects,
          totalProjects,
          bookingsThisMonth,
          bookingsChange,
          totalUsers,
        },
        recentInquiries: recentInquiriesResult.map((inquiry) => ({
          ...inquiry,
          createdAt: inquiry.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch statistics',
      },
      { status: 500 }
    );
  }
}
