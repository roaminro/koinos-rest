import { createSwaggerSpec } from "next-swagger-doc"
import ReactSwagger from "./react-swagger"
import "swagger-ui-react/swagger-ui.css"
import SwaggerSpecs from "@/swagger.specs.json"

const getApiDocs = async () => {
  const spec = createSwaggerSpec(SwaggerSpecs)
  return spec
}

export default async function IndexPage() {
  const spec = await getApiDocs()
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  )
}
