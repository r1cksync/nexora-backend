import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/users/[id] - Get user profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const user = await User.findOne({ userId: params.id });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user);
  } catch (error: any) {
    console.error('Get User Error:', error);
    return errorResponse(error.message || 'Failed to fetch user');
  }
}

// PUT /api/users/[id] - Update user preferences
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();

    const user = await User.findOneAndUpdate(
      { userId: params.id },
      body,
      { new: true, upsert: true }
    );

    return successResponse(user, 'User preferences updated');
  } catch (error: any) {
    console.error('Update User Error:', error);
    return errorResponse(error.message || 'Failed to update user');
  }
}
