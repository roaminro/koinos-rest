import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/account/{account}/mana:
 *   get:
 *     tags: [Accounts]
 *     description: Return the account's available mana.
 *     summary: Obtains the current mana balance for a specified account.
 *     parameters:
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *          example: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS
 *        description: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS is the account address of the fungible token.  Alternatively, the nickname of the address, burnkoin, can also be used. Its KAP names can also be used, however, this contract address does not have any registered yet.
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: string
 *            example:
 *              value: "19.43467354"
 */

export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const provider = getProvider()
    const account = await getAddress(params.account)
    try {
      const rc = await provider.getAccountRc(account)
      return Response.json({
        value: utils.formatUnits(rc, 8)
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
