/**
 * @swagger
 * components:
 *  schemas:
 *    NftInfo:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        symbol:
 *          type: string
 *        total_supply:
 *          type: string
 *        uri:
 *          type: string
 */

export type NftInfo = {
  name: string
  symbol: string
  total_supply: string
  uri: string
}
