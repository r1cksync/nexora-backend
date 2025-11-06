import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { successResponse, errorResponse } from '@/lib/utils';
import { withAuth, AuthenticatedRequest } from '@/lib/auth';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/orders - Get authenticated user's order history
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;

    const orders = await Order.find({ userId }).sort({ timestamp: -1 });

    return successResponse(orders);
  } catch (error: any) {
    console.error('Get Orders Error:', error);
    return errorResponse(error.message || 'Failed to fetch orders');
  }
});
