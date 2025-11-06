import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { aiSearchProducts } from '@/lib/groqService';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/ai/search - AI-powered semantic search
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { query } = body;

    if (!query) {
      return errorResponse('Search query is required', 400);
    }

    const products = await Product.find({});
    const results = await aiSearchProducts(query, products);

    return successResponse(results);
  } catch (error: any) {
    console.error('AI Search Error:', error);
    return errorResponse(error.message || 'Failed to perform search');
  }
}
