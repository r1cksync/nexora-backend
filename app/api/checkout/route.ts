import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { successResponse, errorResponse, generateId } from '@/lib/utils';
import { withAuth, AuthenticatedRequest } from '@/lib/auth';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/checkout - Process checkout
export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;
    const body = await request.json();
    const { customerName, customerEmail, cartItems } = body;

    if (!customerName || !customerEmail || !cartItems || cartItems.length === 0) {
      return errorResponse('Missing required fields', 400);
    }

    // Validate stock availability
    for (const item of cartItems) {
      const product = await Product.findOne({ id: item.productId });
      if (!product) {
        return errorResponse(`Product ${item.name} not found`, 404);
      }
      if (product.stock < item.quantity) {
        return errorResponse(`Insufficient stock for ${item.name}`, 400);
      }
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      orderId: generateId('order'),
      userId,
      customerName,
      customerEmail,
      items: cartItems,
      total,
      status: 'completed',
      timestamp: new Date(),
    });

    // Update product stock
    for (const item of cartItems) {
      await Product.findOneAndUpdate(
        { id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart
    await Cart.findOneAndUpdate(
      { userId },
      { items: [], total: 0 }
    );

    return successResponse(
      {
        orderId: order.orderId,
        total: order.total,
        timestamp: order.timestamp,
        status: order.status,
        items: order.items,
      },
      'Order placed successfully'
    );
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return errorResponse(error.message || 'Failed to process checkout');
  }
});
