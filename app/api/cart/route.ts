import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { successResponse, errorResponse } from '@/lib/utils';
import { withAuth, AuthenticatedRequest } from '@/lib/auth';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/cart - Get authenticated user's cart
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [], total: 0 });
    }

    return successResponse(cart);
  } catch (error: any) {
    console.error('Get Cart Error:', error);
    return errorResponse(error.message || 'Failed to fetch cart');
  }
});

// POST /api/cart - Add item to cart
export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return errorResponse('Product ID is required', 400);
    }

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    if (product.stock < quantity) {
      return errorResponse('Insufficient stock', 400);
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [], total: 0 });
    }

    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });
    }

    await cart.save();

    return successResponse(cart, 'Item added to cart');
  } catch (error: any) {
    console.error('Add to Cart Error:', error);
    return errorResponse(error.message || 'Failed to add item to cart');
  }
});

// PUT /api/cart - Update cart item quantity
export const PUT = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return errorResponse('Product ID and quantity are required', 400);
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return errorResponse('Cart not found', 404);
    }

    const itemIndex = cart.items.findIndex((item: any) => item.productId === productId);

    if (itemIndex === -1) {
      return errorResponse('Item not found in cart', 404);
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await Product.findOne({ id: productId });
      if (product && product.stock < quantity) {
        return errorResponse('Insufficient stock', 400);
      }
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return successResponse(cart, 'Cart updated');
  } catch (error: any) {
    console.error('Update Cart Error:', error);
    return errorResponse(error.message || 'Failed to update cart');
  }
});
