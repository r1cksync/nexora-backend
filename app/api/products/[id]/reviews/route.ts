import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { successResponse, errorResponse, generateId } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/products/[id]/reviews - Add a review
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, userName, rating, comment } = body;

    if (!userId || !userName || !rating || !comment) {
      return errorResponse('Missing required fields', 400);
    }

    const product = await Product.findOne({ id: params.id });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    const review = {
      userId,
      userName,
      rating,
      comment,
      createdAt: new Date(),
    };

    product.reviews.push(review);

    // Update average rating
    const totalRating = product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    product.rating = totalRating / product.reviews.length;

    await product.save();

    return successResponse(product, 'Review added successfully');
  } catch (error: any) {
    console.error('Add Review Error:', error);
    return errorResponse(error.message || 'Failed to add review');
  }
}
