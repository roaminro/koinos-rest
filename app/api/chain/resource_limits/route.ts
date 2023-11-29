import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/chain/resource_limits:
 *   get:
 *     tags: [Chain]
 *     description: Returns the chain's resource limits
 *     summary: Obtains information about the resource limits and usage for the blockchain, such as computational power and network bandwidth.
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Resource Limits
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResourceLimits'
 */
export async function GET() {
  try {
    const provider = getProvider()

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
