import { Provider } from 'koilib'
import { config } from '@/app.config'
import { getContractId } from '@/utils/contracts'
import { handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/contract/{contract_id}/abi:
 *   get:
 *     tags: [Contracts]
 *     description: Returns the contract's ABI
 *     parameters:
 *      - name: contract_id
 *        schema:
 *          type: string
 *        in: path
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: truereturn Response.json(response.transactions[0])
 *     responses:
 *      200:
 *        description: Contract Abi
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ContractAbi'
 */
export async function GET(request: Request, { params }: { params: { contract_id: string } }) {
  try {
    const contract_id = await getContractId(params.contract_id)
    const provider = new Provider(config.jsonRPC)

    const response = (await provider.call('contract_meta_store.get_contract_meta', {
      contract_id
    })) as any

    return Response.json({ contract_id, ...response.meta })
  } catch (error) {
    return handleError(error as Error)
  }
}
