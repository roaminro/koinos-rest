import { createSwaggerSpec } from 'next-swagger-doc'
import SwaggerSpecs from '@/swagger.specs.json'

export function GET() {
  return Response.json(createSwaggerSpec(SwaggerSpecs))
}
