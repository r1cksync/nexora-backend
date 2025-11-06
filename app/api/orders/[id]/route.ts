import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/orders/[id] - Get single order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const order = await Order.findOne({ orderId: params.id });

    if (!order) {
      return errorResponse('Order not found', 404);
    }

    return successResponse(order);
  } catch (error: any) {
    console.error('Get Order Error:', error);
    return errorResponse(error.message || 'Failed to fetch order');
  }
}
