import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/account/{account}/nonce:
 *   get:
 *     tags: [Accounts]
 *     description: Returns the account's nonce
 *     summary: Fetches the current nonce of a specified account.
 *     parameters:
 *      - name: account
 *        schema:
 *          type: string
 *          example: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS
 *        in: path
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
 *              value: "KAk="
 */
export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const provider = getProvider()
    const account = await getAddress(params.account)
    try {
      const nonce = await provider.getNonce(account, false)
      return Response.json({
        value: nonce
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
