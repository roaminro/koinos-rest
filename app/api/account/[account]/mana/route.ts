import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/account/{account}/mana:
 *   get:
 *     tags: [Accounts]
 *     description: Returns the account's mana
 *     parameters:
 *      - name: account
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Value'
 */
export async function GET(
  request: Request,
  { params }: { params: { account: string } }
) {
  try {
    const provider = getProvider()
    const account = await getAddress(params.account)
    try {
      const rc = await provider.getAccountRc(account)
      return Response.json({
        value: utils.formatUnits(rc, 8),
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
