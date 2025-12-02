import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { inquiries } from '@/db/schema/postgres';
import { z } from 'zod';

// Validation schema
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().max(50).optional(),
  company: z.string().max(255).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['general', 'project', 'consultation']).default('general'),
  sourcePage: z.string().max(500),
  locale: z.string().max(10).default('en'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = inquirySchema.parse(body);

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Connect to database
    const client = postgres(process.env.DATABASE_URL!);
    const db = drizzle(client);

    // Insert inquiry
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        message: validatedData.message,
        type: validatedData.type,
        status: 'new',
        sourcePage: validatedData.sourcePage,
        locale: validatedData.locale,
        ipAddress,
        userAgent,
      })
      .returning();

    // Close database connection
    await client.end();

    // TODO: Send email notification to admin
    // await sendInquiryNotification(inquiry);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been submitted successfully. We will get back to you soon!',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while submitting your inquiry. Please try again.',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve inquiries (admin only - will add auth later)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const client = postgres(process.env.DATABASE_URL!);
    const db = drizzle(client);

    // Build query (simplified - will add filtering later)
    const allInquiries = await db.select().from(inquiries).limit(50);

    await client.end();

    return NextResponse.json({
      success: true,
      inquiries: allInquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch inquiries',
      },
      { status: 500 }
    );
  }
}
