import { NextResponse, NextRequest } from 'next/server'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getNicknameOwner } from '@/services/nicknames'

/**
 * @swagger
 * /api/nicknames/{nickname}/address:
 *   get:
 *     tags: [Nicknames]
 *     description: Takes a token's nickname and the owner of that nickname is returned.
 *     parameters:
 *      - name: nickname
 *        schema:
 *          type: string
 *        in: path
 *        description: Input nickname used to retrieve the owner address
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Nickname owner
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function GET(request: NextRequest, { params }: { params: { nickname: string } }) {
  try {
    try {
      const ownerAddress = await getNicknameOwner(params.nickname)
      return NextResponse.json({
        ownerAddress
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
