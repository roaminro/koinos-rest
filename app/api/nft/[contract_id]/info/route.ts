import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getNFTContract } from '@/utils/tokens'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/nft/{contract_id}/info:
 *   get:
 *     tags: [Non Fungible Tokens]
 *     description: Returns the non fungible token's info
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *     responses:
 *       200:
 *        description: NftInfo
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NftInfo'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const contract_id = await getContractId(params.contract_id)

    const contract = getNFTContract(contract_id)

    try {
      const { result: nameRes } = await contract.functions.name()
      const { result: symbolRes } = await contract.functions.symbol()
      const { result: totalSupplyRes } = await contract.functions.total_supply()
      const { result: uriRes } = await contract.functions.uri()

      return Response.json({
        name: nameRes!.value,
        symbol: symbolRes!.value,
        total_supply: totalSupplyRes!.value,
        uri: uriRes!.value
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
