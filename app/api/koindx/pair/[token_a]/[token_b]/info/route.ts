import { getPair } from '@/services/koindx'
import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/koindx/pair/{token_a}/{token_b}/info:
 *   get:
 *     tags: [Koindx]
 *     description: Returns information about a pair of tokens on koindx.com, including address, total supply, reserves, and other details.
 *     parameters:
 *      - name: token_a
 *        in: path
 *        schema:
 *          type: string
 *        description: The token symbol or Koinos address for the first token in the pair
 *        required: true
 *        example: koin
 *      - name: token_b
 *        in: path
 *        schema:
 *          type: string
 *        description: The token symbol or Koinos address for the second token in the pair
 *        required: true
 *        example: vhp
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Detailed Information about the Token Pair
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                address:
 *                  type: string
 *                last_k:
 *                  type: string
 *                block_time:
 *                  type: string
 *                total_supply:
 *                  type: string
 *                token_a:
 *                  type: object
 *                  properties:
 *                    address:
 *                      type: string
 *                    decimals:
 *                      type: integer
 *                reserve_a:
 *                  type: string
 *                token_b:
 *                  type: object
 *                  properties:
 *                    address:
 *                      type: string
 *                    decimals:
 *                      type: integer
 *                reserve_b:
 *                  type: string
 *            example:
 *              address: "1NqLghiFRwkXZR7NBFHHiCJkF5gLHyJap1"
 *              last_k: "433521619319741500846139424"
 *              block_time: "1700537446380"
 *              total_supply: "207950.4194428"
 *              token_a:
 *                address: "vhp"
 *                decimals: 8
 *              reserve_a: "224194.27627671"
 *              token_b:
 *                address: "koin"
 *                decimals: 8
 *              reserve_b: "193450.03684994"
 */

export async function GET(
  request: Request,
  { params }: { params: { token_a: string; token_b: string } }
) {
  try {
    const token_a = await getContractId(params.token_a)
    const token_b = await getContractId(params.token_b)
    const provider = getProvider()

    try {
      const pair = await getPair(token_a, token_b, provider)

      if (!pair) {
        throw new AppError('pair does not exist')
      }

      return Response.json({
        address: pair.address,
        last_k: pair.klast.toString(10),
        block_time: pair.block_time.toString(10),
        total_supply: utils.formatUnits(pair.total_supply.toString(10), 8),
        token_a: {
          address: pair.token_0.address,
          decimals: pair.token_0.decimals
        },
        reserve_a: utils.formatUnits(pair.reserve_0.toString(10), pair.token_0.decimals),
        token_b: {
          address: pair.token_1.address,
          decimals: pair.token_1.decimals
        },
        reserve_b: utils.formatUnits(pair.reserve_1.toString(10), pair.token_1.decimals)
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
