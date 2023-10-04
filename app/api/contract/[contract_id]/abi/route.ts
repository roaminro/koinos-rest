import { getContractId } from '@/utils/contracts'
import { AppError, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'

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
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
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
    const provider = getProvider()

    const response = (await provider.call('contract_meta_store.get_contract_meta', {
      contract_id
    })) as any

    if (!response.meta) {
      throw new AppError(`abi not available for contract ${contract_id}`)
    }

    console.log(response)

    return Response.json({ contract_id, ...response.meta, abi: JSON.parse(response.meta.abi) })
  } catch (error) {
    return handleError(error as Error)
  }
}
