import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/chain/id:
 *   get:
 *     tags: [Chain]
 *     description: Returns the chain id
 *     summary: Fetches the unique identifier of the blockchain, commonly known as the chain ID.
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Value'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const provider = getProvider()

    try {
      const chainId = await provider.getChainId()
      return Response.json({
        value: chainId
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
