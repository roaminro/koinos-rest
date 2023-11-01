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
 *     description: Returns the info of a pair
 *     parameters:
 *      - name: token_a
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *      - name: token_b
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Pair information
 *        content:
 *          application/json:
 *            schema:
 *              type: object
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
