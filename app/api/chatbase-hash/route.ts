import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const secret = process.env.CHATBASE_SECRET;

    if (!secret) {
      console.error('CHATBASE_SECRET environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate HMAC-SHA256 hash
    const hash = crypto
      .createHmac('sha256', secret)
      .update(userId)
      .digest('hex');

    return NextResponse.json({ hash });
  } catch (error) {
    console.error('Error generating chatbase hash:', error);
    return NextResponse.json(
      { error: 'Failed to generate hash' },
      { status: 500 }
    );
  }
}
