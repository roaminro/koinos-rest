import { handleError } from '@/utils/errors'
import { interfaces, Transaction } from 'koilib'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/transaction/submit/{transaction_id}/broadcast/{broadcast_value}:
 *   post:
 *     tags: [Transactions]
 *     description: This endpoint takes a transaction and submits it to the JSON RPC node.
 *     parameters:
 *      - name: transaction_id
 *        in: path
 *        schema:
 *          type: string
 *        description: ID of the transaction
 *        required: true
 *      - name: broadcast_value
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

export async function POST(
  request: Request,
  { params }: { params: { transaction_id: interfaces.TransactionJson; broadcast_value: boolean } }
) {
  try {
    // Get the JSON RPC provider
    const provider = getProvider()

    // Submit the transaction to the JSON RPC using the provider
    const result = await provider.sendTransaction(params.transaction_id, params.broadcast_value)

    return Response.json(result)
  } catch (error) {
    return handleError(error as Error)
  }
}
