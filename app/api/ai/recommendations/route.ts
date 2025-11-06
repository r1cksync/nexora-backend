import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';
import { getAIRecommendations } from '@/lib/groqService';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/ai/recommendations - Get AI-powered product recommendations
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { userId } = body;

    // Get all products
    const products = await Product.find({});

    let userPreferences = {
      categories: [],
      priceRange: { min: 0, max: 10000 },
    };

    // Get user preferences if userId provided
    if (userId) {
      const user = await User.findOne({ userId });
      if (user && user.preferences) {
        userPreferences = user.preferences;
      }
    }

    // Get AI recommendations
    const recommendations = await getAIRecommendations(userPreferences, products);

    return successResponse(recommendations);
  } catch (error: any) {
    console.error('AI Recommendations Error:', error);
    return errorResponse(error.message || 'Failed to get recommendations');
  }
}
