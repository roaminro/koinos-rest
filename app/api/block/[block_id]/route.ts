import { Provider, interfaces } from 'koilib'
import { config } from '@/app.config'
import { getContractId } from '@/utils/contracts'
import { AppError, handleError } from '@/utils/errors'

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
    const provider = new Provider(config.jsonRPC)

    const block_id = params.block_id
    if (block_id.startsWith('0x')) {
      const blocks = await provider.call<{
        block_items: {
          block_id: string
          block_height: string
          block: interfaces.BlockJson
        }[]
      }>('block_store.get_blocks_by_id', {
        return_block: true,
        return_receipt: true,
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
        return_block: true,
        return_receipt: true,
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
