import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    const newUserId = getOrCreateUser(userId);

    return NextResponse.json({ userId: newUserId });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    const newUserId = getOrCreateUser(userId);

    return NextResponse.json({ userId: newUserId });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
