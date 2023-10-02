import ReactSwagger from './react-swagger'
import SwaggerJson from '@/public/swagger.json'

export default async function IndexPage() {
  return (
    <section className="container">
      <ReactSwagger spec={SwaggerJson} />
    </section>
  )
}
