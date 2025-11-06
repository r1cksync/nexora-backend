import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// DELETE /api/cart/[id] - Remove item from cart
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return errorResponse('User ID is required', 400);
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return errorResponse('Cart not found', 404);
    }

    const itemIndex = cart.items.findIndex((item: any) => item.productId === params.id);

    if (itemIndex === -1) {
      return errorResponse('Item not found in cart', 404);
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    return successResponse(cart, 'Item removed from cart');
  } catch (error: any) {
    console.error('Remove from Cart Error:', error);
    return errorResponse(error.message || 'Failed to remove item from cart');
  }
}
