import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { decodeEvents } from '@/utils/events'
import { decodeOperations } from '@/utils/operations'
import { getProvider } from '@/utils/providers'
import { interfaces } from 'koilib'
import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/account/{account}/history:
 *   get:
 *     tags: [Accounts]
 *     description: Returns the transaction history by inputting a Koinos address, a system contract name or a KAP name
 *
 *     parameters:
 *      - name: account
 *        schema:
 *          type: string
 *        in: path
 *        description: Can be a Koinos address, a system contract name or a KAP name
 *        required: true
 *
 *      - name: limit
 *        schema:
 *          type: string
 *        in: query
 *        description: Number of records to be returned
 *        required: true
 *
 *      - name: sequence_number
 *        schema:
 *          type: string
 *        in: query
 *        description: Sequence number offset
 *        required: false
 *
 *      - name: ascending
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Arrange records in ascending or descending order.
 *        required: false
 *
 *      - name: irreversible
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Choose if irreversible history records should be returned or not.
 *        required: false
 *
 *      - name: decode_operations
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the operations should be decoded
 *        required: false
 *
 *      - name: decode_events
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the events should be decoded
 *        required: false
 *
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *
 *     responses:
 *       200:
 *        description: Transaction
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */

export type BlockReceiptJson = {
  id?: string
  height?: string
  disk_storage_used?: string
  network_bandwidth_used?: string
  compute_bandwidth_used?: string
  state_merkle_root?: string
  events?: interfaces.EventData[]
  token_events: string[]
  transaction_receipts?: interfaces.TransactionReceipt[]
  logs?: string[]
  disk_storage_charged?: string
  network_bandwidth_charged?: string
  compute_bandwidth_charged?: string
  amount?: string
}

export type TransactionReceiptJson = {
  timestamp: string
  id: string
  payer: string
  max_payer_rc: string
  rc_limit: string
  rc_used: string
  disk_storage_used: string
  network_bandwidth_used: string
  compute_bandwidth_used: string
  reverted: boolean
  events: interfaces.EventData[]
  token_events: string[]
  logs: string[]
  amount?: string
}

export type HistoryRecord = {
  trx?: {
    transaction: interfaces.TransactionJson
    receipt: TransactionReceiptJson
  }

  block?: {
    header: interfaces.BlockHeaderJson
    receipt: BlockReceiptJson
  }

  koinPrice?: number
  seq_num?: string
}

export async function GET(request: NextRequest, { params }: { params: { account: string } }) {
  try {
    try {
      const provider = getProvider()
      const { searchParams } = new URL(request.url)
      const limit = searchParams.get('limit')
      const seqNum = searchParams.get('sequence_number')
      const ascending = searchParams.get('ascending') !== 'false'
      const irreversible = searchParams.get('irreversible') !== 'false'
      const decode_operations = searchParams.get('decode_operations') !== 'false'
      const decode_events = searchParams.get('decode_events') !== 'false'

      const account = await getAddress(params.account)

      const { values } = await provider.call<{
        values?: HistoryRecord[]
      }>('account_history.get_account_history', {
        address: account,
        limit,
        ascending,
        irreversible,
        decode_operations,
        decode_events,
        ...(seqNum && { seq_num: seqNum })
      })

      if (values && values.length > 0) {
        const updatedValues = await Promise.all(
          values.map(async (item) => {
            if (item.trx) {
              const { trx } = item
              const eventsPromise =
                decode_events && trx.receipt && trx.receipt.events
                  ? decodeEvents(trx.receipt.events)
                  : Promise.resolve(trx.receipt ? trx.receipt.events : undefined)
              const operationsPromise =
                decode_operations && trx.transaction && trx.transaction.operations
                  ? decodeOperations(trx.transaction.operations)
                  : Promise.resolve(trx.transaction ? trx.transaction.operations : undefined)

              const [events, operations] = await Promise.all([eventsPromise, operationsPromise])

              return {
                ...item,
                trx: {
                  ...trx,
                  receipt: {
                    ...trx.receipt,
                    events
                  },
                  transaction: {
                    ...trx.transaction,
                    operations
                  }
                }
              }
            }

            if (item.block) {
              const { block } = item
              const eventsPromise =
                decode_events && block.receipt && block.receipt.events
                  ? decodeEvents(block.receipt.events)
                  : Promise.resolve(block.receipt ? block.receipt.events : undefined)

              const events = await eventsPromise

              return {
                ...item,
                block: {
                  ...block,
                  receipt: {
                    ...block.receipt,
                    events
                  }
                }
              }
            }

            return item
          })
        )

        return NextResponse.json(updatedValues)
      }

      return NextResponse.json(values)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
