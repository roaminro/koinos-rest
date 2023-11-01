import { handleError } from '@/utils/errors'
import { interfaces, Transaction } from 'koilib'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/transaction/prepare-transaction:
 *   post:
 *     tags: [Transactions]
 *     description: This endpoint takes a transaction and an optional provider and/or payer, then returns a prepared transaction object.
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
    const provider = getProvider()
    const transaction = (await request.json()) as interfaces.TransactionJson
    const preparedTransaction = await Transaction.prepareTransaction(
      transaction,
      provider
      // '1PWdJ3VFB6kwu6wLdLPr9BwQZrNiPs7g8j'
    )

    return Response.json(preparedTransaction)
  } catch (error) {
    return handleError(error as Error)
  }
}
