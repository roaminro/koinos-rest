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
 *     description: Input a user's contract address & a system contract address to return the user contract address' total balance of a fungible token represented by the system contract address.Feel free to test the placeholder values and the respective response below before testing out your own data.
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *          example: 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *          example: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Value
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: string
 *                  example: "16134.92705173"
 */
export async function GET(
  request: Request,
  { params }: { params: { account: string; contract_id: string } }
) {
  try {
    const contract_id = await getContractId(params.contract_id)
    const contract = getFTContract(contract_id)

    const account = await getAccountAddress(params.account)

    try {
      const { result: balanceRes } = await contract.functions.balance_of({
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
