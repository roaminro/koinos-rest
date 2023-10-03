import { config } from '@/app.config'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { Provider } from 'koilib'

/**
 * @swagger
 * /api/chain/resource_limits:
 *   get:
 *     tags: [Chain]
 *     description: Returns the chain's resource limits
 *     responses:
 *       200:
 *        description: Resource Limits
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResourceLimits'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const provider = new Provider(config.jsonRPC)

    try {
      const forkHeads = await provider.call('chain.get_resource_limits', {})
      return Response.json(forkHeads)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
