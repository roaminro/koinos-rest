import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

/**
 * @swagger
 * /api/account/{account}/next_nonce:
 *   get:
 *     tags: [Accounts]
 *     description: Returns the account's next nonce
 *     summary: Retrieves the next nonce value for a given account.
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
 *              value: "KAo="
 */
export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const provider = getProvider()
    const account = await getAddress(params.account)

    try {
      const nextNonce = await provider.getNextNonce(account)
      return Response.json({
        value: nextNonce
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
