import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { interfaces, Transaction } from 'koilib'
import { getProvider } from '@/utils/providers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/transaction/prepare:
 *   post:
 *     tags: [Transactions]
 *     description: This endpoint takes a transaction and an optional provider and/or payer, then returns a prepared transaction object.
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     requestBody:
 *      description: Arguments
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *
 *     responses:
 *       200:
 *        description: Call response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */

export async function POST(request: NextRequest) {
  try {
    try {
      const provider = getProvider()
      const transaction = (await request.json()) as interfaces.TransactionJson

      const preparedTransaction = await Transaction.prepareTransaction(transaction, provider)

      return NextResponse.json(preparedTransaction)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
