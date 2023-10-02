import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getFTContract } from '@/utils/tokens'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/fts/{contract_id}/info:
 *   get:
 *     tags: [Fungible Tokens]
 *     description: Returns the fungible token's info
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *     responses:
 *       200:
 *        description: FtInfo
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FtInfo'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const contract_id = await getContractId(params.contract_id)

    const contract = getFTContract(contract_id)

    try {
      const { result: nameRes } = await contract.functions.name()
      const { result: symbolRes } = await contract.functions.symbol()
      const { result: decimalRes } = await contract.functions.decimals()
      const { result: totalSupplyRes } = await contract.functions.totalSupply()

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
