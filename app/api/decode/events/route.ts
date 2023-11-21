import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { interfaces } from 'koilib'
import { NextRequest, NextResponse } from 'next/server'
import { decodeEvents } from '@/utils/events'

/**
 * @swagger
 * /api/decode/events:
 *   post:
 *     tags: [Decode]
 *     description: This endpoint takes an array of "encoded" events and returns an array of "decoded" events. Feel free to test the example request body and response below before testing out your own data.
 *
 *     parameters:
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *
 *     requestBody:
 *       description: Input is expected to be an array of "encoded" events.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/EncodedEvent'
 *             example:
 *               - call_contract:
 *                   source: '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr'
 *                   name: 'koinos.contracts.token.burn_event'
 *                   data: 'ChkA7-Mh3yERswBXFp2UPvegxIiGAauR1O_zEM2RkHE='
 *                   impacted: ["1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"]
 *               - call_contract:
 *                   sequence: 1
 *                   source: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL'
 *                   name: 'koinos.contracts.token.mint_event'
 *                   data: 'ChkA7-Mh3yERswBXFp2UPvegxIiGAauR1O_zELW7zHU='
 *                   impacted: ["1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"]
 *
 *     responses:
 *       200:
 *         description: Call response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 - call_contract:
 *                    source: '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr'
 *                    name: 'koinos.contracts.token.burn_event'
 *                    data:
 *                      from: "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"
 *                      value: "237242573"
 *                    impacted: ["1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"]
 *                 - call_contract:
 *                    sequence: 1
 *                    source: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL'
 *                    name: 'koinos.contracts.token.mint_event'
 *                    data:
 *                      to: "1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"
 *                      value: "246619573"
 *                    impacted: ["1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS"]
 *
 * components:
 *   schemas:
 *     EncodedEvent:
 *             type: object
 *             properties:
 *               sequence:
 *                 type: integer
 *                 nullable: true
 *               source:
 *                 type: string
 *               name:
 *                 type: string
 *               data:
 *                 type: string
 *               impacted:
 *                 type: array
 *                 items:
 *                    type: string
 */

export async function POST(request: NextRequest) {
  try {
    try {
      const events = (await request.json()) as interfaces.EventData[]
      const result = await decodeEvents(events)

      return NextResponse.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
