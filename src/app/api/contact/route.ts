import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  type?: string;
  sourcePage?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending or database storage
    // For now, log the submission and return success
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message.substring(0, 100) + '...',
      type: data.type,
      sourcePage: data.sourcePage,
      locale: data.locale,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Message received successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
