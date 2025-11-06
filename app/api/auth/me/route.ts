import { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/jwt';
import { successResponse, errorResponse } from '@/lib/utils';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return errorResponse('Not authenticated', 401);
    }

    await dbConnect();

    // Fetch full user data
    const userData = await User.findOne({ userId: user.userId }).select('-password');

    if (!userData) {
      return errorResponse('User not found', 404);
    }

    return successResponse({
      userId: userData.userId,
      name: userData.name,
      email: userData.email,
      wishlist: userData.wishlist,
      preferences: userData.preferences,
    });
  } catch (error: any) {
    console.error('Get User Error:', error);
    return errorResponse(error.message || 'Failed to get user data');
  }
}
