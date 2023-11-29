import { NextRequest, NextResponse } from 'next/server'
import { getNicknamesOwned } from '@/services/nicknames'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getAddress } from '@/utils/addresses'

/**
 * @swagger
 * /api/nicknames/{account}/names:
 *   get:
 *     tags: [Nicknames]
 *     description: Takes an account address and returns the nicknames owned by that account.
 *     summary: Retrieves a list of nicknames associated with a specific Koinos blockchain account address.
 *     parameters:
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *        description: The account address or nickname for which to retrieve owned nicknames.
 *        required: true
 *        example: '@jga'
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *
 *     responses:
 *       200:
 *        description: List of Nicknames Owned by the Account
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                names:
 *                  type: array
 *                  items:
 *                    type: string
 *            example:
 *              names:
 *                - "acidyo"
 *                - "aggroed"
 *                - "anomadsoul"
 *                - "asgarth"
 *                - "binance"
 *                - "bitfinex"
 *                - "bitflyer"
 */

export async function GET(request: NextRequest, { params }: { params: { account: string } }) {
  try {
    const account = await getAddress(params.account)

    try {
      const names = await getNicknamesOwned(account)

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
