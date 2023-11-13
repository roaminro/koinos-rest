import { AppError, handleError } from '@/utils/errors'
import { decodeEvents } from '@/utils/events'
import { decodeOperations } from '@/utils/operations'
import { getProvider } from '@/utils/providers'
import { interfaces } from 'koilib'

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
 *      - name: return_receipt
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the receipt content should be returned
 *      - name: decode_operations
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the operations should be decoded
 *      - name: decode_events
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the events should be decoded
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

    const { searchParams } = new URL(request.url)
    const return_receipt = searchParams.get('return_receipt') !== 'false'
    const decode_operations = searchParams.get('decode_operations') !== 'false'
    const decode_events = searchParams.get('decode_events') !== 'false'

    const response = await provider.getTransactionsById([params.transaction_id])

    if (!response.transactions.length) {
      throw new AppError('transaction does not exist')
    }

    const [transaction] = response.transactions

    if (return_receipt) {
      const blocks = await provider.call<{
        block_items: {
          block_id: string
          block_height: string
          block: interfaces.BlockJson
          receipt: {
            transaction_receipts: interfaces.TransactionReceipt[]
          }
        }[]
      }>('block_store.get_blocks_by_id', {
        return_block: true,
        return_receipt: true,
        block_ids: transaction.containing_blocks
      })

      if (blocks.block_items.length) {
        for (const blockItem of blocks.block_items) {
          if (blockItem.block !== undefined) {
            // @ts-ignore dynamically add the timestamp field to result
            transaction.transaction.timestamp = blockItem.block.header!.timestamp!

            const receipt = blockItem.receipt.transaction_receipts.find(
              (receipt) => receipt.id === transaction.transaction.id
            )

            if (receipt) {
              if (decode_events && receipt.events) {
                receipt.events = await decodeEvents(receipt.events)
              }

              // @ts-ignore dynamically add the receipt to result
              transaction.receipt = receipt
            }
          }
        }
      }
    }

    if (decode_operations && transaction.transaction.operations) {
      transaction.transaction.operations = await decodeOperations(
        transaction.transaction.operations
      )
    }

    return Response.json(transaction)
  } catch (error) {
    return handleError(error as Error)
  }
}
