import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import { successResponse, errorResponse } from '@/lib/utils';
import { withAuth, AuthenticatedRequest } from '@/lib/auth';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/wishlist - Get authenticated user's wishlist
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;

    let user = await User.findOne({ userId });

    if (!user) {
      return successResponse([]);
    }

    // Get full product details for wishlist items
    const productIds = user.wishlist.map((item: any) => item.productId);
    const products = await Product.find({ id: { $in: productIds } });

    return successResponse(products);
  } catch (error: any) {
    console.error('Get Wishlist Error:', error);
    return errorResponse(error.message || 'Failed to fetch wishlist');
  }
});

// POST /api/wishlist - Add item to wishlist
export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return errorResponse('Product ID is required', 400);
    }

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    const existingItem = user.wishlist.find((item: any) => item.productId === productId);

    if (existingItem) {
      return errorResponse('Item already in wishlist', 400);
    }

    user.wishlist.push({
      productId,
      addedAt: new Date(),
    });

    await user.save();

    return successResponse(user.wishlist, 'Item added to wishlist');
  } catch (error: any) {
    console.error('Add to Wishlist Error:', error);
    return errorResponse(error.message || 'Failed to add item to wishlist');
  }
});

// DELETE /api/wishlist - Remove item from wishlist
export const DELETE = withAuth(async (request: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const userId = request.user!.userId;
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    if (!productId) {
      return errorResponse('Product ID is required', 400);
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    user.wishlist = user.wishlist.filter((item: any) => item.productId !== productId);
    await user.save();

    return successResponse(user.wishlist, 'Item removed from wishlist');
  } catch (error: any) {
    console.error('Remove from Wishlist Error:', error);
    return errorResponse(error.message || 'Failed to remove item from wishlist');
  }
});
