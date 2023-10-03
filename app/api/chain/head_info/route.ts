import { config } from '@/app.config'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { Provider } from 'koilib'

/**
 * @swagger
 * /api/chain/head_info:
 *   get:
 *     tags: [Chain]
 *     description: Returns the chain's head info
 *     responses:
 *       200:
 *        description: Head Info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HeadInfo'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const provider = new Provider(config.jsonRPC)

    try {
      const headInfo = await provider.getHeadInfo()
      return Response.json(headInfo)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
