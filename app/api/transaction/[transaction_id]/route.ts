import { AppError, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/transaction/{transaction_id}:
 *   get:
 *     tags: [Transactions]
 *     description: Returns the transaction
 *     parameters:
 *      - name: transaction_id
 *        schema:
 *          type: string
 *        in: path
 *        description: The id of the transaction
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Transaction
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function GET(request: Request, { params }: { params: { transaction_id: string } }) {
  try {
    const provider = getProvider()

    const response = await provider.getTransactionsById([params.transaction_id])

    if (!response.transactions.length) {
      throw new AppError('transaction does not exist')
    }

    return Response.json(response.transactions[0])
  } catch (error) {
    return handleError(error as Error)
  }
}
