import { AppError, getErrorMessage, handleError } from "@/utils/errors";
import { interfaces } from "koilib";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { decodeOperations } from "@/utils/operations";

/**
 * @swagger
 * /api/decode/operations:
 *   post:
 *     tags: [Decode]
 *     description: This endpoint takes a transaction, an array of "encoded" operations, and returns an array of "decoded" operations.
 *
 *     parameters:
 *       - name: encodedOpsArray
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               call_contract:
 *                 type: object
 *                 properties:
 *                   contract_id:
 *                     type: string
 *                   entry_point:
 *                     type: integer
 *                   args:
 *                     type: string
 *         description: Input is expected to be an array of "encoded" operations.
 *         required: true
 *
 *     requestBody:
 *       description: Arguments
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       200:
 *         description: Call response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

export async function POST(request: NextRequest,{params}:{params:interfaces.OperationJson[]}) {
  try {
    try {
      const result=  await decodeOperations(params);

      const operationsPath = request.nextUrl.searchParams.get("operations") || "/";
      revalidatePath(operationsPath);

      return NextResponse.json(result);
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error));
    }
  } catch (error) {
    return handleError(error as Error);
  }
}
