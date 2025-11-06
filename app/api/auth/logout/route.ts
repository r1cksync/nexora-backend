import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/utils';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/auth/logout - User logout
export async function POST(request: NextRequest) {
  // Since we're using JWT tokens stored on client,
  // logout is handled on client side by removing the token
  return successResponse(null, 'Logged out successfully');
}
