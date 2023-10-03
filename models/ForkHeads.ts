/**
 * @swagger
 * components:
 *  schemas:
 *    ForkHeads:
 *      type: object
 *      properties:
 *        last_irreversible_block:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            height:
 *              type: string
 *            previous:
 *              type: string
 *        fork_heads:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              height:
 *                type: string
 *              previous:
 *                type: string
 */

export type ForkHeads = {
  last_irreversible_block: {
    id: string
    height: string
    previous: string
  }
  fork_heads: {
    id: string
    height: string
    previous: string
  }[]
}
