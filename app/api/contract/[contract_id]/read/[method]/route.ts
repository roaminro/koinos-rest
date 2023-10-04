import { getContract, getContractId, processArgs } from '@/utils/contracts'
import qs from 'qs'
import { AppError, handleError, getErrorMessage } from '@/utils/errors'

/**
 * @swagger
 * /api/contract/{contract_id}/read/{method}:
 *   get:
 *     tags: [Contracts]
 *     description: Read the contract contract using the method and arguments provided
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *      - name: method
 *        in: path
 *        schema:
 *          type: string
 *        description: Method of the contract to call
 *        required: true
 *      - name: arguments
 *        in: query
 *        schema:
 *          type: object
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: Call response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function GET(
  request: Request,
  { params }: { params: { contract_id: string; method: string } }
) {
  try {
    const contract_id = await getContractId(params.contract_id)

    const method = params.method

    let { search } = new URL(request.url)

    let args = {}
    if (search) {
      if (search.startsWith('?')) {
        search = search.substring(1)
      }
      args = qs.parse(search, { allowDots: true })
    }

    try {
      const contract = await getContract(contract_id)

      if (!contract.functions[method]) {
        throw new AppError(`method "${method}" does not exist`)
      }

      // process args
      if (contract.abi!.methods[method].argument) {
        args = await processArgs(
          args,
          contract.serializer?.root,
          contract.serializer?.root.lookupType(contract.abi!.methods[method].argument!)
        )
      }

      const { result } = await contract.functions[method](args)

      return Response.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}

/**
 * @swagger
 * /api/contract/{contract_id}/read/{method}:
 *   post:
 *     tags: [Contracts]
 *     description: Read the contract contract using the method and arguments provided
 *     parameters:
 *      - name: contract_id
 *        in: path
 *        schema:
 *          type: string
 *        description: Koinos address of the contract, name of the contract (for system contracts) or KAP name
 *        required: true
 *      - name: method
 *        in: path
 *        schema:
 *          type: string
 *        description: Method of the contract to call
 *        required: true
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     requestBody:
 *      description: Arguments
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *     responses:
 *       200:
 *        description: Call response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
export async function POST(
  request: Request,
  { params }: { params: { contract_id: string; method: string } }
) {
  try {
    const contract_id = await getContractId(params.contract_id)

    const method = params.method
    let args = await request.json()

    try {
      const contract = await getContract(contract_id)

      if (!contract.functions[method]) {
        throw new AppError(`method "${method}" does not exist`)
      }

      // process args
      if (contract.abi!.methods[method].argument) {
        args = await processArgs(
          args,
          contract.serializer?.root,
          contract.serializer?.root.lookupType(contract.abi!.methods[method].argument!)
        )
      }

      const { result } = await contract.functions[method](args)

      return Response.json(result)
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
