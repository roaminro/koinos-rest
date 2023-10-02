import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getFTContract } from '@/utils/tokens'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/fts/{contract_id}/balance/{account}:
 *   get:
 *     tags: [Fungible Tokens]
 *     description: Returns the fungible token's total supply
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
    const contract = getFTContract(contract_id)

    const account = await getContractId(params.account)

    try {
      const { result: balanceRes } = await contract.functions.balanceOf({
        owner: account
      })
      const { result: decimalRes } = await contract.functions.decimals()

      return Response.json({
        value: utils.formatUnits(balanceRes!.value, decimalRes!.value)
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
