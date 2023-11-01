import { AppError, getErrorMessage, handleError } from "@/utils/errors";
import { decodeEvents } from "@/utils/events";
import { decodeOperations } from "@/utils/operations";
import { getProvider } from "@/utils/providers";
import { interfaces, Contract, Provider, utils } from "koilib";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/account/{account}:
 *   put:
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
 *        in: path
 *        description: Number of records to be returned
 *        required: false

*      - name: sequence_number
 *        schema:
 *          type: string
 *        in: path
 *        description: Sequence number offset
 *        required: false
 *
 *      - name: ascending
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Arrange records in ascending or descending order.

*      - name: irreversible
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Choose if irreversible history records should be returned or not.
 * 
 *      - name: decode_operations
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the operations should be decoded
 * 
 *      - name: decode_events
 *        schema:
 *          type: boolean
 *        in: query
 *        description: Whether or not the events should be decoded
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
  id?: string;
  height?: string;
  disk_storage_used?: string;
  network_bandwidth_used?: string;
  compute_bandwidth_used?: string;
  state_merkle_root?: string;
  events?: interfaces.EventData[];
  token_events: string[];
  transaction_receipts?: interfaces.TransactionReceipt[];
  logs?: string[];
  disk_storage_charged?: string;
  network_bandwidth_charged?: string;
  compute_bandwidth_charged?: string;
  amount?: string;
};

export type TransactionReceiptJson = {
  timestamp: string;
  id: string;
  payer: string;
  max_payer_rc: string;
  rc_limit: string;
  rc_used: string;
  disk_storage_used: string;
  network_bandwidth_used: string;
  compute_bandwidth_used: string;
  reverted: boolean;
  events: interfaces.EventData[];
  token_events: string[];
  logs: string[];
  amount?: string;
};

export type HistoryRecord = {
  trx?: {
    transaction: interfaces.TransactionJson;
    receipt: TransactionReceiptJson;
  };

  block?: {
    header: interfaces.BlockHeaderJson;
    receipt: BlockReceiptJson;
  };

  koinPrice?: number;
  seq_num?: string;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { account: string } }
): Promise<HistoryRecord[]> {
  try {
    try {
      const provider = getProvider();

      const { searchParams } = new URL(request.url);
      const limit = searchParams.get("limit") !== "";
      const seqNum = searchParams.get("seqNum") !== "";
      const ascending = searchParams.get("ascending") !== "false";
      const irreversible = searchParams.get("irreversible") !== "false";
      const decode_operations =
        searchParams.get("decode_operations") !== "false";
      const decode_events = searchParams.get("decode_events") !== "false";

      const { values } = await provider!.call<{
        values?: HistoryRecord[];
      }>("account_history.get_account_history", {
        address: params.account,
        limit,
        ascending,
        irreversible,
        ...(seqNum && { seq_num: seqNum }),
      });

      if (!values) {
        return [];
      }

      // if (irreversible) {
      //   const blocks = await provider.call<{
      //     block_items: {
      //       block_id: string;
      //       block_height: string;
      //       block: interfaces.BlockJson;
      //       receipt: {
      //         transaction_receipts: interfaces.TransactionReceipt[];
      //       };
      //     }[];
      //   }>("block_store.get_blocks_by_id", {
      //     return_block: false,
      //     irreversible: true,
      //     block_ids: [transaction.containing_blocks[0]],
      //   });

      //   if (blocks.block_items.length) {
      //     const receipt =
      //       blocks.block_items[0].receipt.transaction_receipts.find(
      //         (receipt) => receipt.id === transaction.transaction.id
      //       );

      //     if (receipt) {
      //       if (decode_events && receipt.events) {
      //         receipt.events = await decodeEvents(receipt.events);
      //       }

      //       // @ts-ignore dynamically add the receipt to result
      //       transaction.receipt = receipt;
      //     }
      //   }
      // }

      // if (decode_operations && transaction.transaction.operations) {
      //   transaction.transaction.operations = await decodeOperations(
      //     transaction.transaction.operations
      //   );
      // }

      // const historyPath = request.nextUrl.searchParams.get("/account/*") || "/";
      // revalidatePath(historyPath);

      // return NextResponse.json(transaction);
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error));
    }
  } catch (error) {
    // return handleError(error as Error);
  }
}
