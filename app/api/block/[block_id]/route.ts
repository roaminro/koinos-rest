import { interfaces } from 'koilib'
import { AppError, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

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
 *      - name: return_block
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Wether or not the block content should be returned
 *      - name: return_receipt
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Wether or not the receipts content should be returned
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Block
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function GET(request: Request, { params }: { params: { block_id: string } }) {
  try {
    const provider = getProvider()

    const { searchParams } = new URL(request.url)
    const return_block = searchParams.get('return_block') !== 'false'
    const return_receipt = searchParams.get('return_receipt') !== 'false'

    const block_id = params.block_id
    if (block_id.startsWith('0x')) {
      const blocks = await provider.call<{
        block_items: {
          block_id: string
          block_height: string
          block: interfaces.BlockJson
        }[]
      }>('block_store.get_blocks_by_id', {
        return_block,
        return_receipt,
        block_ids: [block_id]
      })

      if (!blocks.block_items.length) {
        throw new AppError('block does not exist')
      }

      return Response.json(blocks.block_items[0])
    } else {
      const blocks = await provider.call<{
        block_items: {
          block_id: string
          block_height: string
          block: interfaces.BlockJson
        }[]
      }>('block_store.get_blocks_by_height', {
        return_block,
        return_receipt,
        num_blocks: 1,
        ancestor_start_height: block_id,
        head_block_id: (await provider.getHeadInfo()).head_topology.id
      })

      if (!blocks.block_items.length) {
        throw new AppError('block does not exist')
      }

      return Response.json(blocks.block_items[0])
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
