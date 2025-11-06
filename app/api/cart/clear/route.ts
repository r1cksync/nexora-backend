import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { successResponse, errorResponse } from '@/lib/utils';
import { withAuth, AuthenticatedRequest } from '@/lib/auth';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// DELETE /api/cart/clear - Clear entire cart
export const DELETE = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return errorResponse('Cart not found', 404);
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    return successResponse(cart, 'Cart cleared');
  } catch (error: any) {
    console.error('Clear Cart Error:', error);
    return errorResponse(error.message || 'Failed to clear cart');
  }
});
