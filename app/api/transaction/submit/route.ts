import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { interfaces } from 'koilib'
import { getProvider } from '@/utils/providers'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * @swagger
 * /api/transaction/submit:
 *   post:
 *     tags: [Transactions]
 *     description: This endpoint takes a transaction and submits it to the JSON RPC node.
 *     summary: Submits a prepared transaction to the blockchain network for processing.
 *     parameters:
 *      - name: broadcast
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Sets whether this transaction is broadcasted globally or not. Defaults to true.
 *        required: false
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
    // Get the JSON RPC provider
    const provider = getProvider()

    const transaction = (await request.json()) as interfaces.TransactionJson

    const { searchParams } = new URL(request.url)
    const broadcast = searchParams.get('broadcast') !== 'false'

    try {
      // Submit the transaction to the JSON RPC using the provider
      const result = await provider.sendTransaction(transaction, broadcast)

      const submitPath = request.nextUrl.searchParams.get('submit') || '/'
      revalidatePath(submitPath)

      return NextResponse.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
