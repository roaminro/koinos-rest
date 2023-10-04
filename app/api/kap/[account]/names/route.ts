import { getKAPNames } from '@/services/kap'
import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/kap/{account}/names:
 *   get:
 *     tags: [Koinos Account Protocol]
 *     description: Returns the account's KAP names
 *     parameters:
 *      - name: account
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Kap Names
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const account = await getAddress(params.account)

    try {
      const names = await getKAPNames(account)

      return Response.json({
        names
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
