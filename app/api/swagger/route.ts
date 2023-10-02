import SwaggerJson from '@/public/swagger.json'

export function GET() {
  return Response.json(SwaggerJson)
}
