import { handleError } from "@/utils/errors";
import { interfaces, Transaction } from "koilib";
import { getProvider } from "@/utils/providers";

export async function POST(
  request: Request,
  { body }: { body: interfaces.TransactionJson }
) {
  const provider = getProvider();
  try {
    let preparedTransaction = await Transaction.prepareTransaction(body);

    preparedTransaction.id = "";

    preparedTransaction.header!.operation_merkle_root = "";

    preparedTransaction.header!.chain_id = await provider.getChainId();

    // If payer exists, set rc limit and nonce
    if (
      preparedTransaction.header?.payer &&
      preparedTransaction.header?.payer !== undefined
    ) {
      preparedTransaction.header!.rc_limit = "";
      preparedTransaction.header!.nonce = "";
    }

    // console.log(preparedTransaction);

    return Response.json(preparedTransaction);
  } catch (error) {
    return handleError(error as Error);
  }
}
