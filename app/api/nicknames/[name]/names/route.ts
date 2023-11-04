import { NextResponse } from 'next/server';
import { getNicknames } from '@/services/nicknames'
import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/nicknames/{account}/names:
 *   get:
 *     tags: [Nicknames]
 *     description: An account address is passed and the names owned by that account are returned.
 *     parameters:
 *      - name: account
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts)
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 * 
 *     responses:
 *       200:
 *        description: Nicknames
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function GET( { params }: { params: { account: string } }) {
  try {
    const account = await getAddress(params.account)

    try {
      const names = await getNicknames(account)

      return NextResponse.json({
        names
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
