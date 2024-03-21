import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const LOCAL_IP = '127.0.0.1'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s')
})

// CORS headers for the api endpoints
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export async function middleware(request: NextRequest) {
  // maintenance mode handler
  if (process.env.MAINTENANCE_MODE === 'ON') {
    request.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(request.nextUrl)
  }

  const response = NextResponse.next()

  // CORS handler
  if (request.method === 'OPTIONS') {
    return NextResponse.json(null, { status: 204, headers: corsHeaders })
  }

  // rate limiter handler
  const ip = request.ip ?? LOCAL_IP

  if (ip !== '127.0.0.1') {
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `koinos_rest_ratelimit_${ip}`
    )

    if (!success) {
      return NextResponse.json(null, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      })
    }
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
