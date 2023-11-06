import { interfaces } from 'koilib'
import { AppError, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'
import { decodeEvents } from '@/utils/events'
import { decodeOperations } from '@/utils/operations'

/**
 * @swagger
 * /api/block/{block_id}:
 *   get:
 *     tags: [Blocks]
 *     description: Returns the block
 *     parameters:
 *      - name: block_id
 *        schema:
 *          type: string
 *        in: path
 *        description: The block id or number
 *        required: true
 *
 *      - name: return_block
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Wether or not the block content should be returned
 *
 *      - name: return_receipt
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Wether or not the receipts content should be returned
 *
 *      - name: decode_operations
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Wether or not the operations should be decoded
 *
 *      - name: decode_events
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Wether or not the events should be decoded
 *
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Block
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */

export async function GET(
  request: Request,
  { params }: { params: { block_id: string } }
) {
  try {
    const provider = getProvider()

    const { searchParams } = new URL(request.url)
    const return_block = searchParams.get('return_block') !== 'false'
    const return_receipt = searchParams.get('return_receipt') !== 'false'
    const decode_operations = searchParams.get('decode_operations') !== 'false'
    const decode_events = searchParams.get('decode_events') !== 'false'

    const block_id = params.block_id
    let blocks
    if (block_id.startsWith('0x')) {
      blocks = await provider.call<{
        block_items: {
          block_id: string
          block_height: string
          block: interfaces.BlockJson
          receipt: {
            events: interfaces.EventData[]
            transaction_receipts: interfaces.TransactionReceipt[]
          }
        }[]
      }>('block_store.get_blocks_by_id', {
        return_block,
        return_receipt,
        block_ids: [block_id],
      })
    } else {
      blocks = await provider.call<{
        block_items: {
          block_id: string
          block_height: string
          block: interfaces.BlockJson
          receipt: {
            events: interfaces.EventData[]
            transaction_receipts: interfaces.TransactionReceipt[]
          }
        }[]
      }>('block_store.get_blocks_by_height', {
        return_block,
        return_receipt,
        num_blocks: 1,
        ancestor_start_height: block_id,
        head_block_id: (await provider.getHeadInfo()).head_topology.id,
      })
    }

    if (!blocks.block_items.length) {
      throw new AppError('block does not exist')
    }

    const [block] = blocks.block_items

    if (block.receipt && decode_events) {
      if (block.receipt.events) {
        block.receipt.events = await decodeEvents(block.receipt.events)
      }

      if (block.receipt.transaction_receipts) {
        for (
          let index = 0;
          index < block.receipt.transaction_receipts.length;
          index++
        ) {
          const receipt = block.receipt.transaction_receipts[index]
          if (receipt.events) {
            block.receipt.transaction_receipts[index].events =
              await decodeEvents(receipt.events)
          }
        }
      }
    }

    if (block.block && block.block.transactions && decode_operations) {
      for (let index = 0; index < block.block.transactions.length; index++) {
        const transaction = block.block.transactions[index]

        if (transaction.operations) {
          block.block.transactions[index].operations = await decodeOperations(
            transaction.operations
          )
        }
      }
    }

    return Response.json(block)
  } catch (error) {
    return handleError(error as Error)
  }
}
