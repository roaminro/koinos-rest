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
 *     description: Retrieves the balance of a specific fungible token for a given account. The balance is determined by the contract address of the token. The example demonstrates how to query the balance of the token with contract ID 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL for the account with address 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS.
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *          example: 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL
 *        description: 15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL is the contract address of the fungible token.  Alternatively, the name of the contract, KOIN, can also be used. Its KAP names can also be used, however, this contract address does not have any registered yet.
 *        required: true
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *          example: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS
 *        description: 1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS is the account address of the fungible token.  Alternatively, the nickname of the address, burnkoin, can also be used. Its KAP names can also be used, however, this contract address does not have any registered yet.
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
