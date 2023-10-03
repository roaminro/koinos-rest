import { config } from '@/app.config'
import { Provider } from 'koilib'
import { headers } from 'next/headers'

export function getProvider() {
  const xJsonRpc = headers().get('X-JSON-RPC-URL') || config.jsonRPC

  return new Provider(xJsonRpc)
}
