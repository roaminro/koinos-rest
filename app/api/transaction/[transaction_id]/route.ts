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
 *     description: Returns detailed information about a specific transaction.
 *     summary: Retrieves detailed information about a specific transaction by its ID.
 *     parameters:
 *      - name: transaction_id
 *        in: path
 *        schema:
 *          type: string
 *        description: The unique identifier of the transaction
 *        required: true
 *        example: "0x1220552e1d8798d7174053229c740a9908fffb7b4cbe7b9fff4605943723540a940f"
 *      - name: return_receipt
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Specifies whether the transaction receipt should be included in the response
 *      - name: decode_operations
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Specifies whether the operations within the transaction should be decoded
 *      - name: decode_events
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Specifies whether the events within the transaction should be decoded
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Detailed Transaction Information
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                transaction:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    header:
 *                      type: object
 *                      properties:
 *                        chain_id:
 *                          type: string
 *                        rc_limit:
 *                          type: string
 *                        nonce:
 *                          type: string
 *                        operation_merkle_root:
 *                          type: string
 *                        payer:
 *                          type: string
 *                    operations:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          type:
 *                            type: string
 *                          data:
 *                            type: object
 *                    signatures:
 *                      type: array
 *                      items:
 *                        type: string
 *                    timestamp:
 *                      type: string
 *                containing_blocks:
 *                  type: array
 *                  items:
 *                    type: string
 *                receipt:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    payer:
 *                      type: string
 *                    max_payer_rc:
 *                      type: string
 *                    rc_limit:
 *                      type: string
 *                    rc_used:
 *                      type: string
 *                    network_bandwidth_used:
 *                      type: string
 *                    compute_bandwidth_used:
 *                      type: string
 *                    state_delta_entries:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          object_space:
 *                            type: object
 *                            properties:
 *                              system:
 *                                type: boolean
 *                              zone:
 *                                type: string
 *                              id:
 *                                type: string
 *                          key:
 *                            type: string
 *                          value:
 *                            type: string
 *            example:
 *              transaction:
 *                id: "0x1220552e1d8798d7174053229c740a9908fffb7b4cbe7b9fff4605943723540a940f"
 *                header:
 *                  chain_id: "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
 *                  rc_limit: "200000000"
 *                  nonce: "KOLwAw=="
 *                  operation_merkle_root: "EiCHTrIa6ArkSCYET7W9pivvrmlMf5SUi8gKaCPzUwtVAQ=="
 *                  payer: "17CmTGbriMyCypF6WdTRJGhzur3SoJXAG5"
 *                operations:
 *                  - # Detailed operations
 *                signatures:
 *                  - "H8bPkFWRI2bE--9vVoJveBFjziv0ZifxYJUa2mUBSNnrXKPBxC9AkQ7Q__3R6wuQ0qdO2ApxP1tPWRLBELdB2uQ="
 *                timestamp: "1700541332810"
 *              containing_blocks:
 *                - "0x122029c7af4c3bb0dea862c875cc12fe8e0d79fcd8490a8388dcb0ceeb6c16ac5d85"
 *              receipt:
 *                id: "0x1220552e1d8798d7174053229c740a9908fffb7b4cbe7b9fff4605943723540a940f"
 *                payer: "17CmTGbriMyCypF6WdTRJGhzur3SoJXAG5"
 *                max_payer_rc: "47500000000"
 *                rc_limit: "200000000"
 *                rc_used: "17913994"
 *                network_bandwidth_used: "286"
 *                compute_bandwidth_used: "687846"
 *                state_delta_entries:
 *                  - object_space:
 *                      system: true
 *                      zone: "example_zone"
 *                      id: "example_id"
 *                    key: "example_key"
 *                    value: "example_value"
 *                    additional_detail:
 *                      detail_key1: "detail_value1"
 *                      detail_key2: "detail_value2"
 *                      # Further nested details as applicable
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
