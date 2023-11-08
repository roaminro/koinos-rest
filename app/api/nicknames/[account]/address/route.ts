import { NextRequest, NextResponse } from 'next/server'
import { getNicknamesOwned } from '@/services/nicknames'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
<<<<<<<< HEAD:app/api/nicknames/[account]/names/route.ts

/**
 * @swagger
 * /api/nicknames/{account}/names:
========
import { getAddress } from '@/utils/addresses'

/**
 * @swagger
 * /api/nicknames/{account}/address:
>>>>>>>> main:app/api/nicknames/[account]/address/route.ts
 *   get:
 *     tags: [Nicknames]
 *     description: An account address is passed and the names owned by that account are returned.
 *     parameters:
 *      - name: account
 *        schema:
 *          type: string
 *        in: path
 *        description: Nickname of the account
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
export async function GET(request: NextRequest, { params }: { params: { account: string } }) {
  try {
    try {
<<<<<<<< HEAD:app/api/nicknames/[account]/names/route.ts
      const names = await getNicknamesOwned(params.account)

      return NextResponse.json({
        names
========
      const address = await getAddress(params.account)

      return NextResponse.json({
        address
>>>>>>>> main:app/api/nicknames/[account]/address/route.ts
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
