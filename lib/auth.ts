import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, JWTPayload } from './jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export function withAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    // Attach user to request
    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = user;

    return handler(authenticatedRequest);
  };
}

export function optionalAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const user = getUserFromRequest(request);

    // Attach user to request if available
    const authenticatedRequest = request as AuthenticatedRequest;
    if (user) {
      authenticatedRequest.user = user;
    }

    return handler(authenticatedRequest);
  };
}
