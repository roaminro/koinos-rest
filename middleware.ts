import { NextRequest, NextResponse } from 'next/server'

// CORS headers for the api endpoints
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'ON') {
    request.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(request.nextUrl)
  }

  const response = NextResponse.next()

  if (request.method === 'OPTIONS') {
    return NextResponse.json(null, { status: 204, headers: corsHeaders })
  }

  response.headers.append('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin'])
  response.headers.append(
    'Access-Control-Allow-Methods',
    corsHeaders['Access-Control-Allow-Methods']
  )
  response.headers.append(
    'Access-Control-Allow-Headers',
    corsHeaders['Access-Control-Allow-Headers']
  )

  return response
}

export const config = {
  matcher: '/api/:path*'
}
