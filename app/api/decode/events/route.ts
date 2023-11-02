import { AppError, getErrorMessage, handleError } from "@/utils/errors";
import { interfaces } from "koilib";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { decodeEvents } from "@/utils/events";

/**
 * @swagger
 * /api/decode/events:
 *   post:
 *     tags: [Decode]
 *     description: This takes an array of "encoded" events and returns an array of "decoded" events
 *
 *     parameters:
 *       - name: encodedEventsArray
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

export async function POST(request: NextRequest,{params}:{params:interfaces.EventData[]}) {
  try {
    try {
      const result=  await decodeEvents(params);

      const eventsPath = request.nextUrl.searchParams.get("events") || "/";
      revalidatePath(eventsPath);

      return NextResponse.json(result);
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error));
    }
  } catch (error) {
    return handleError(error as Error);
  }
}
