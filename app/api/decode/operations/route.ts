import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { interfaces } from 'koilib'
import { NextRequest, NextResponse } from 'next/server'
import { decodeOperations } from '@/utils/operations'

/**
 * @swagger
 * /api/decode/operations:
 *   post:
 *     tags: [Decode]
 *     description: This endpoint takes an array of 'encoded' operations and returns an array of 'decoded' operations.
 *
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 * 
 *     requestBody:
 *       description: Input is expected to be an array of 'encoded' operations.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 call_contract:
 *                   type: object
 *                   properties:
 *                     contract_id:
 *                       type: string
 *                     entry_point:
 *                       type: integer
 *                     args:
 *                       type: string
 *             example:
 *               - call_contract:
 *                   contract_id: '1D53GFQkL5TkQ9okuf6r3Gta3oeTMVgGJW'
 *                   entry_point: 3870180098
 *                   args: 'ChkALjP9GqkHsiTOnObJQiiQHSg6AtqVbaeREM_czhU='
 *
 *     responses:
 *       200:
 *         description: Call response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

export async function POST(request: NextRequest) {
  try {
    try {
      const operations= (await request.json()) as interfaces.OperationJson[]
      const result=  await decodeOperations(operations)

      return NextResponse.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
