import { getPair, getQuote } from '@/services/koindx'
import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/koindx/pair/{token_a}/{token_b}/get_quote/{amount_a}:
 *   get:
 *     tags: [Koindx]
 *     description: Returns the quote for a given amount of token A in terms of token B
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
 *      - name: amount_a
 *        in: path
 *        schema:
 *          type: string
 *        description: The amount of token A for which to get the quote
 *        required: true
 *        example: 1
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Quote for Token A in terms of Token B
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                amount_a:
 *                  type: string
 *                amount_b:
 *                  type: string
 *            example:
 *              amount_a: "1"
 *              amount_b: "1.15892599"
 */

export async function GET(
  request: Request,
  { params }: { params: { token_a: string; token_b: string; amount_a: string } }
) {
  try {
    const token_a = await getContractId(params.token_a)
    const token_b = await getContractId(params.token_b)
    const amount_a = params.amount_a

    const provider = getProvider()

    const pair = await getPair(token_a, token_b, provider)

    if (!pair) {
      throw new AppError('pair does not exist')
    }

    const quote = getQuote(pair, token_a, amount_a)

    return Response.json({
      amount_a,
      amount_b: quote
    })
  } catch (error) {
    return handleError(error as Error)
  }
}
