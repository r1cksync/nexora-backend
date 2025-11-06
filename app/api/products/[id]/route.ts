import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const product = await Product.findOne({ id: params.id });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(product);
  } catch (error: any) {
    console.error('Get Product Error:', error);
    return errorResponse(error.message || 'Failed to fetch product');
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();

    const product = await Product.findOneAndUpdate(
      { id: params.id },
      body,
      { new: true }
    );

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(product, 'Product updated successfully');
  } catch (error: any) {
    console.error('Update Product Error:', error);
    return errorResponse(error.message || 'Failed to update product');
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const product = await Product.findOneAndDelete({ id: params.id });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(null, 'Product deleted successfully');
  } catch (error: any) {
    console.error('Delete Product Error:', error);
    return errorResponse(error.message || 'Failed to delete product');
  }
}
