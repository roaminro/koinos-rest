import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { interfaces } from 'koilib'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/transaction/submit:
 *   post:
 *     tags: [Transactions]
 *     description: This endpoint takes a transaction and submits it to the JSON RPC node.
 *
 *     parameters:
 *      - name: broadcast
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Sets whether this transaction is broadcast globally or not. Defaults to true.
 *        required: false
 *
 *     requestBody:
 *      description: Arguments
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *
 *     responses:
 *       200:
 *        description: Call response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */

export async function POST(request: Request) {
  try {
    // Get the JSON RPC provider
    const provider = getProvider()

    const transaction = (await request.json()) as interfaces.TransactionJson

    // /api/transaction/submit?broadcast=true
    const { searchParams } = new URL(request.url)
    const broadcast = searchParams.get('broadcast') !== 'false'

    try {
      // Submit the transaction to the JSON RPC using the provider
      const result = await provider.sendTransaction(transaction, broadcast)

      return Response.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
