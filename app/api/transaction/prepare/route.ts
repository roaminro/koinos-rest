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
 *      description: Arguments for preparing a transaction
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              header:
 *                type: object
 *                properties:
 *                  rc_limit:
 *                    type: string
 *                  payer:
 *                    type: string
 *              operations:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    call_contract:
 *                      type: object
 *                      properties:
 *                        contract_id:
 *                          type: string
 *                        entry_point:
 *                          type: integer
 *                        args:
 *                          type: string
 *          example:
 *            header:
 *              rc_limit: "200000000"
 *              payer: "17CmTGbriMyCypF6WdTRJGhzur3SoJXAG5"
 *            operations:
 *              - call_contract:
 *                  contract_id: "1D53GFQkL5TkQ9okuf6r3Gta3oeTMVgGJW"
 *                  entry_point: 3870180098
 *                  args: "ChkALjP9GqkHsiTOnObJQiiQHSg6AtqVbaeREODhtjM="
 *
 *     responses:
 *       200:
 *        description: Prepared Transaction Object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                header:
 *                  type: object
 *                  properties:
 *                    chain_id:
 *                      type: string
 *                    rc_limit:
 *                      type: string
 *                    nonce:
 *                      type: string
 *                    operation_merkle_root:
 *                      type: string
 *                    payer:
 *                      type: string
 *              operations:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    call_contract:
 *                      type: object
 *                      properties:
 *                        contract_id:
 *                          type: string
 *                        entry_point:
 *                          type: integer
 *                        args:
 *                          type: string
 *                    # Additional operation types can be defined here
 *                id:
 *                  type: string
 *            example:
 *              header:
 *                chain_id: "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
 *                rc_limit: "200000000"
 *                nonce: "KOjwAw=="
 *                operation_merkle_root: "EiCHTrIa6ArkSCYET7W9pivvrmlMf5SUi8gKaCPzUwtVAQ=="
 *                payer: "17CmTGbriMyCypF6WdTRJGhzur3SoJXAG5"
 *              operations:
 *                - call_contract:
 *                    contract_id: "1D53GFQkL5TkQ9okuf6r3Gta3oeTMVgGJW"
 *                    entry_point: 3870180098
 *                    args: "ChkALjP9GqkHsiTOnObJQiiQHSg6AtqVbaeREODhtjM="
 *              id: "0x1220bb67dfdbdeea69d84bd11f1ffc358b9a846463cc2969ecab93c561b4a25b8d5e"
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
