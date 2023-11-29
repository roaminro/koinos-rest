import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getFTContract } from '@/utils/tokens'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/ft/{contract_id}/info:
 *   get:
 *     tags: [Fungible Tokens]
 *     description: Returns the fungible token's information such as name, symbol, decimals, and total supply
 *     summary: Provides comprehensive information about a specific fungible token, including name, symbol, and total supply.
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *        example: 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Fungible Token Information
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                symbol:
 *                  type: string
 *                decimals:
 *                  type: integer
 *                  format: int32
 *                total_supply:
 *                  type: string
 *            example:
 *              name: "Koin"
 *              symbol: "KOIN"
 *              decimals: 8
 *              total_supply: "33437554.76476687"
 */

export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const contract_id = await getContractId(params.contract_id)

    const contract = getFTContract(contract_id)

    try {
      const { result: nameRes } = await contract.functions.name()
      const { result: symbolRes } = await contract.functions.symbol()
      const { result: decimalRes } = await contract.functions.decimals()
      const { result: totalSupplyRes } = await contract.functions.total_supply()

      return Response.json({
        name: nameRes!.value,
        symbol: symbolRes!.value,
        decimals: decimalRes!.value,
        total_supply: utils.formatUnits(totalSupplyRes!.value, decimalRes!.value)
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
