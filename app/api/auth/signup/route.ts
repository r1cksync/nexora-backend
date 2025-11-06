import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { successResponse, errorResponse, generateId } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/auth/signup - Register new user
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return errorResponse('Name, email, and password are required', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse('User with this email already exists', 400);
    }

    // Validate password strength
    if (password.length < 6) {
      return errorResponse('Password must be at least 6 characters long', 400);
    }

    // Create new user
    const userId = generateId('user');
    const user = await User.create({
      userId,
      name,
      email,
      password, // Will be hashed by the pre-save hook
      wishlist: [],
      preferences: {
        favoriteCategories: [],
        priceRange: { min: 0, max: 10000 },
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.userId,
      email: user.email,
      name: user.name,
    });

    // Return user data (without password)
    return successResponse(
      {
        token,
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          wishlist: user.wishlist,
          preferences: user.preferences,
        },
      },
      'User registered successfully'
    );
  } catch (error: any) {
    console.error('Signup Error:', error);
    return errorResponse(error.message || 'Failed to register user');
  }
}
