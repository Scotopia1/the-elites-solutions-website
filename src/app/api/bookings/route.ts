import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { bookings } from '@/db/schema/postgres';
import { z } from 'zod';

// Validation schema
const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().min(6, 'Phone number is required').max(50),
  company: z.string().max(255).optional(),
  preferredDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  preferredTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format (HH:MM)',
  }),
  timezone: z.string().max(100).default('UTC'),
  serviceInterested: z.string().uuid().optional(),
  message: z.string().max(1000).optional(),
  locale: z.string().max(10).default('en'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = bookingSchema.parse(body);

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Connect to database
    const client = postgres(process.env.DATABASE_URL!);
    const db = drizzle(client);

    // Insert booking
    const [booking] = await db
      .insert(bookings)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        preferredDate: validatedData.preferredDate,
        preferredTime: validatedData.preferredTime,
        timezone: validatedData.timezone,
        serviceInterested: validatedData.serviceInterested,
        message: validatedData.message,
        status: 'pending',
        locale: validatedData.locale,
        ipAddress,
      })
      .returning();

    // Close database connection
    await client.end();

    // TODO: Send email confirmation to client
    // TODO: Send notification to admin
    // await sendBookingConfirmation(booking);
    // await sendBookingNotification(booking);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your consultation has been booked successfully! We will send you a confirmation email shortly.',
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);

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
        message: 'An error occurred while booking your consultation. Please try again.',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve bookings (admin only - will add auth later)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const client = postgres(process.env.DATABASE_URL!);
    const db = drizzle(client);

    // Build query (simplified - will add filtering and auth later)
    const allBookings = await db.select().from(bookings).limit(50);

    await client.end();

    return NextResponse.json({
      success: true,
      bookings: allBookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch bookings',
      },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update booking status (admin only - will add auth later)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking ID and status are required',
        },
        { status: 400 }
      );
    }

    // TODO: Add authentication check here
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }

    const client = postgres(process.env.DATABASE_URL!);
    const db = drizzle(client);

    // Update booking status
    const [updatedBooking] = await db
      .update(bookings)
      .set({
        status,
        confirmedAt: status === 'confirmed' ? new Date() : undefined,
        completedAt: status === 'completed' ? new Date() : undefined,
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId))
      .returning();

    await client.end();

    if (!updatedBooking) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update booking',
      },
      { status: 500 }
    );
  }
}
