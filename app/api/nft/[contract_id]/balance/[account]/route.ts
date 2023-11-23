import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getNFTContract } from '@/utils/tokens'

/**
 * @swagger
 * /api/nft/{contract_id}/balance/{account}:
 *   get:
 *     tags: [Non Fungible Tokens]
 *     description: Returns the non fungible token's account balance.
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: The Koinos address of the NFT contract.
 *        required: true
 *        example: 1N2AhqGGticZ8hYmwNPWoroEBvTp3YGsLW
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *        description: The Koinos address of the account to query.
 *        required: true
 *        example: 1DrBJQkSK1Zh7JW7XjQxcRU96NBVnew7iR
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Account Balance in NFTs
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: string
 *            example:
 *              value: "5"
 */

export async function GET(
  request: Request,
  { params }: { params: { contract_id: string; account: string } }
) {
  try {
    const contract_id = await getContractId(params.contract_id)
    const contract = getNFTContract(contract_id)

    const account = await getContractId(params.account)

    try {
      const { result: balanceRes } = await contract.functions.balance_of({
        owner: account
      })

      return Response.json(balanceRes)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
