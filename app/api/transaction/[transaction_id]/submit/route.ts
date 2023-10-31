import { handleError } from "@/utils/errors";
import { interfaces, Transaction } from "koilib";
import { getProvider } from "@/utils/providers";

export async function POST(
  request: Request,
  { params }: { params: interfaces.TransactionJson }
) {
  try {
    // Get the JSON RPC provider
    const provider = getProvider();

    // Submit the transaction to the JSON RPC using the provider
    const result = await provider.sendTransaction(params);

    return Response.json(result);
  } catch (error) {
    return handleError(error as Error);
  }
}
