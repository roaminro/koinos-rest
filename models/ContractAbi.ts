/**
 * @swagger
 * components:
 *  schemas:
 *    ContractAbi:
 *      type: object
 *      properties:
 *        contract_id:
 *          type: string
 *        abi:
 *          type: string
 */

export type ContractAbi = {
  contract_id: string
  abi: string
}
