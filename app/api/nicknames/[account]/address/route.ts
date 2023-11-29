import { NextResponse, NextRequest } from 'next/server'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getAddress } from '@/utils/addresses'

/**
 * @swagger
 * /api/nicknames/{account}/address:
 *   get:
 *     tags: [Nicknames]
 *     description: Retrieves the owner address associated with a given nickname.
 *     summary: Fetches the Koinos blockchain address associated with a given nickname.
 *     parameters:
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *        description: The nickname used to retrieve the owner's address.
 *        required: true
 *        example: '@jga'
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Owner's Address of the Nickname
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                address:
 *                  type: string
 *            example:
 *              address: "1MdqwaSBy6rbasPJ9vmg2pZFJSVZ29GFpZ"
 */

export async function GET(request: NextRequest, { params }: { params: { account: string } }) {
  try {
    try {
      const address = await getAddress(params.account)

      return NextResponse.json({
        address
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
