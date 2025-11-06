import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Order from '@/models/Order';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/analytics?userId=xxx - Get cart and order analytics
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return errorResponse('User ID is required', 400);
    }

    const cart = await Cart.findOne({ userId });
    const orders = await Order.find({ userId });

    const analytics = {
      cart: {
        itemCount: cart?.items.length || 0,
        total: cart?.total || 0,
      },
      orders: {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
        averageOrderValue: orders.length > 0 
          ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length 
          : 0,
      },
      recentActivity: {
        lastOrder: orders[0] || null,
        itemsInCart: cart?.items || [],
      },
    };

    return successResponse(analytics);
  } catch (error: any) {
    console.error('Analytics Error:', error);
    return errorResponse(error.message || 'Failed to fetch analytics');
  }
}
