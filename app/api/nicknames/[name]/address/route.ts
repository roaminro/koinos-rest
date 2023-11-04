import { NextResponse } from 'next/server';
import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/nicknames/{name}/address:
 *   get:
 *     tags: [Nicknames]
 *     description: Takes a token's nickname and the owner of that nickname is returned.
 *     parameters:
 *      - name: name
 *        schema:
 *          type: string
 *        in: path
 *        description: Input nickname used to retrieve the owner address
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

export async function GET({ params }: { params: { name: string } }) {
  try {
    try {
      const address = await getAddress(params.name)

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
