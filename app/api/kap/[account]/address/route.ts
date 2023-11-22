import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/kap/{name}/address:
 *   get:
 *     tags: [Koinos Account Protocol]
 *     description: Returns the address associated with a Koinos Account Protocol (KAP) name
 *     parameters:
 *      - name: name
 *        in: path
 *        schema:
 *          type: string
 *        description: KAP name to retrieve the address for
 *        required: true
 *        example: kuixi.koin
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: KAP Address
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                address:
 *                  type: string
 *            example:
 *              address: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 */

export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    try {
      const address = await getAddress(params.account)

      return Response.json({
        address
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
