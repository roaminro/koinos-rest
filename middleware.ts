import { NextResponse } from 'next/server'

// CORS headers for the api endpoints
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export function middleware(request: Request) {
  if (request.method === 'OPTIONS') {
    return NextResponse.json(null, { status: 204, headers })
  }
}

export const config = {
  matcher: '/api/:path*'
}
