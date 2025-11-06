import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { mockProducts } from '@/data/mockProducts';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// Initialize products in database
async function initializeProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(mockProducts);
    console.log('Products initialized');
  }
}

// GET /api/products - Get all products or search
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    await initializeProducts();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'name';

    let query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(query).sort(sort);

    return successResponse(products);
  } catch (error: any) {
    console.error('Get Products Error:', error);
    return errorResponse(error.message || 'Failed to fetch products');
  }
}

// POST /api/products - Add a new product (admin)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const product = await Product.create(body);

    return successResponse(product, 'Product created successfully');
  } catch (error: any) {
    console.error('Create Product Error:', error);
    return errorResponse(error.message || 'Failed to create product');
  }
}
