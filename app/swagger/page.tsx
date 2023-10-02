'use client'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import SwaggerJson from '@/public/swagger.json'

export default function IndexPage() {
  return (
    <section className="container">
      <SwaggerUI spec={SwaggerJson} />
    </section>
  )
}

export const dynamic = 'force-dynamic'
