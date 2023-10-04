import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/kap/{name}/address:
 *   get:
 *     tags: [Koinos Account Protocol]
 *     description: Returns the KAP name's address
 *     parameters:
 *      - name: name
 *        schema:
 *          type: string
 *        in: path
 *        description: KAP name to retrieve the address for
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Value'
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
