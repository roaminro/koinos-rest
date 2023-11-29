import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getNFTContract } from '@/utils/tokens'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/nft/{contract_id}/info:
 *   get:
 *     tags: [Non Fungible Tokens]
 *     description: Returns information about the non fungible token, such as its name, symbol, total supply, and URI.
 *     summary: Provides comprehensive information about a specific Non Fungible Token contract, including such as its name, symbol, total supply, and URI.
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: The Koinos address of the NFT contract.
 *        required: true
 *        example: 1N2AhqGGticZ8hYmwNPWoroEBvTp3YGsLW
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Information about the Non Fungible Token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                symbol:
 *                  type: string
 *                total_supply:
 *                  type: string
 *                uri:
 *                  type: string
 *            example:
 *              name: "OG-REX"
 *              symbol: "REX"
 *              total_supply: "350"
 *              uri: "https://ogrex.io/api/rex/"
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
