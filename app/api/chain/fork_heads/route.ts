import { config } from '@/app.config'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { Provider } from 'koilib'

/**
 * @swagger
 * /api/chain/fork_heads:
 *   get:
 *     tags: [Chain]
 *     description: Returns the chain's fork heads
 *     responses:
 *       200:
 *        description: Fork Heads
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForkHeads'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const provider = new Provider(config.jsonRPC)

    try {
      const forkHeads = await provider.call('chain.get_fork_heads', {})
      return Response.json(forkHeads)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
