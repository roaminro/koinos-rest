import { getAccountAddress } from '@/utils/addresses'
import { getContractId } from '@/utils/contracts'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'
import { getFTContract } from '@/utils/tokens'
import { utils } from 'koilib'

/**
 * @swagger
 * /api/account/{account}/balance/{contract_id}:
 *   get:
 *     tags: [Accounts]
 *     description: Returns an input account's total balance of an input fungible token
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *      - name: account
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
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
  { params }: { params: { account: string; contract_id: string } }
) {
  try {
    const contract_id = await getContractId(params.contract_id)
    const contract = getFTContract(contract_id)

    const account = await getAccountAddress(params.account)

    // console.log(contract)
    // console.log(contract_id, account)

    try {
      const { result: balanceRes } = await contract.functions.balance_of({
        owner: account
      })
      const { result: decimalRes } = await contract.functions.decimals()

      console.log(balanceRes, decimalRes)

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
