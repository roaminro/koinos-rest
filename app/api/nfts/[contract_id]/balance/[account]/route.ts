import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getNFTContract } from '@/utils/tokens'

/**
 * @swagger
 * /api/nfts/{contract_id}/balance/{account}:
 *   get:
 *     tags: [Non Fungible Tokens]
 *     description: Returns the non fungible token's account balance
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *      - name: account
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Value'
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
