import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/chain/head_info:
 *   get:
 *     tags: [Chain]
 *     description: Returns the chain's head info
 *     summary: Provides information about the current head of the blockchain, including its height and id.
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Head Info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HeadInfo'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const provider = getProvider()

    try {
      const headInfo = await provider.getHeadInfo()
      return Response.json(headInfo)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
