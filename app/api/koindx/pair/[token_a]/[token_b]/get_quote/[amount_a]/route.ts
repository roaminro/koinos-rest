import { getPair, getQuote } from '@/services/koindx'
import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/koindx/pair/{token_a}/{token_b}/get_quote/{amount_a}:
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
 *      - name: amount_a
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
