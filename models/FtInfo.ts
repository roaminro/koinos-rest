/**
 * @swagger
 * components:
 *  schemas:
 *    FtInfo:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        symbol:
 *          type: string
 *        decimals:
 *          type: number
 *        total_supply:
 *          type: string
 */

export type FtInfo = {
  name: string
  symbol: string
  decimals: number
  total_supply: string
}
