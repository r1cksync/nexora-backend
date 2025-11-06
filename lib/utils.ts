import { NextResponse } from 'next/server';

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-CSRF-Token',
  'Access-Control-Allow-Credentials': 'true',
};

export function successResponse(data: any, message?: string) {
  return NextResponse.json({
    success: true,
    message,
    data,
  }, {
    headers: corsHeaders,
  });
}

export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { 
      status,
      headers: corsHeaders,
    }
  );
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
