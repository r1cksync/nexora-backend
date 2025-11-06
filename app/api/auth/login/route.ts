import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { successResponse, errorResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse('Invalid email or password', 401);
    }

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
      'Login successful'
    );
  } catch (error: any) {
    console.error('Login Error:', error);
    return errorResponse(error.message || 'Failed to login');
  }
}
