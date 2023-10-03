/**
 * @swagger
 * components:
 *  schemas:
 *    HeadInfo:
 *      type: object
 *      properties:
 *        head_topology:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            height:
 *              type: string
 *            previous:
 *              type: string
 *        last_irreversible_block:
 *          type: string
 *        head_state_merkle_root:
 *          type: string
 *        head_block_time:
 *          type: string
 */

export type HeadInfo = {
  head_topology: {
    id: string
    height: string
    previous: string
  }
  last_irreversible_block: string
  head_state_merkle_root: string
  head_block_time: string
}
