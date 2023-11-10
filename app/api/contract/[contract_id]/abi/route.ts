import { getContractId } from '@/utils/contracts'
import { AppError, handleError } from '@/utils/errors'
import { getProvider } from '@/utils/providers'
import { interfaces } from 'koilib'
import { convert } from '@roamin/koinos-pb-to-proto'
import protobufjs from 'protobufjs'

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

    const response = await provider.call<{ meta?: { abi: string } }>(
      'contract_meta_store.get_contract_meta',
      {
        contract_id
      }
    )

    if (!response.meta) {
      throw new AppError(`abi not available for contract ${contract_id}`)
    }

    const abi: interfaces.Abi = {
      ...JSON.parse(response.meta.abi)
    }

    Object.keys(abi.methods).forEach((name) => {
      abi!.methods[name] = {
        ...abi!.methods[name]
      }

      //@ts-ignore this is needed to be compatible with "old" abis
      if (abi.methods[name]['entry-point']) {
        //@ts-ignore this is needed to be compatible with "old" abis
        abi.methods[name].entry_point = parseInt(
          //@ts-ignore this is needed to be compatible with "old" abis
          String(abi.methods[name]['entry-point'])
        )
      }

      //@ts-ignore this is needed to be compatible with "old" abis
      if (abi.methods[name]['read-only'] !== undefined) {
        //@ts-ignore this is needed to be compatible with "old" abis
        abi.methods[name].read_only = abi.methods[name]['read-only']
      }
    })

    if (abi.types) {
      const pd = convert(abi?.types)
      if (pd.length) {
        try {
          const root = new protobufjs.Root()
          for (const desc of pd) {
            const parserResult = protobufjs.parse(desc.definition)
            root.add(parserResult.root)
          }
          // extract the first nested object
          abi.koilib_types = root.toJSON().nested?.['']
        } catch (error) {
          // ignore the parsing errors
          console.log(error)
        }
      }
    }

    return Response.json({ contract_id, ...response.meta, abi })
  } catch (error) {
    return handleError(error as Error)
  }
}
