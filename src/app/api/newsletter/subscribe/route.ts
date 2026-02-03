import { NextRequest, NextResponse } from 'next/server';

interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
  languagePreference?: 'en' | 'fr' | 'ar';
  sourcePage?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: NewsletterSubscription = await request.json();

    // Validate required fields
    if (!data.email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
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

    // TODO: Implement actual newsletter subscription (e.g., Mailchimp, ConvertKit, database)
    // For now, log the subscription and return success
    console.log('Newsletter subscription:', {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      interests: data.interests,
      languagePreference: data.languagePreference,
      sourcePage: data.sourcePage,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
