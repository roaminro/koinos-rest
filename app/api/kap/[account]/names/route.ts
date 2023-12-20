import { getKAPNames } from '@/services/kap'
import { getAddress } from '@/utils/addresses'
import { AppError, getErrorMessage, handleError } from '@/utils/errors'

/**
 * @swagger
 * /api/kap/{account}/names:
 *   get:
 *     tags: [Koinos Account Protocol (KAP)]
 *     description: Returns the Koinos Account Protocol (KAP) names associated with an account
 *     summary: Retrieves the KAP names associated with a specific account address.
 *     parameters:
 *      - name: account
 *        in: path
 *        schema:
 *          type: string
 *        description: Koinos address of the account, name of the account (for system contracts) or KAP name
 *        required: true
 *        example: 1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q
 *      - $ref: '#/components/parameters/X-JSON-RPC-URL'
 *     responses:
 *       200:
 *        description: List of KAP Names
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                names:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      domain:
 *                        type: string
 *                      name:
 *                        type: string
 *                      owner:
 *                        type: string
 *                      expiration:
 *                        type: string
 *                      grace_period_end:
 *                        type: string
 *            example:
 *              names:
 *                - domain: "koin"
 *                  name: "pizzapizza"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1723302395510"
 *                  grace_period_end: "1728486395510"
 *                - domain: "koin"
 *                  name: "何逵熙"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1776607888050"
 *                  grace_period_end: "1781791888050"
 *                - domain: "koin"
 *                  name: "darren"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1779715794620"
 *                  grace_period_end: "1784899794620"
 *                - domain: "koin"
 *                  name: "kuixihe"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1997279134440"
 *                  grace_period_end: "2002463134440"
 *                - domain: "koin"
 *                  name: "ronald"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1713639181670"
 *                  grace_period_end: "1718823181670"
 *                - domain: "koin"
 *                  name: "888"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1712880076090"
 *                  grace_period_end: "1718064076090"
 *                - domain: "koin"
 *                  name: "kuixi"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1776527066000"
 *                  grace_period_end: "1781711066000"
 *                - domain: "koin"
 *                  name: "frankie"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1780680322360"
 *                  grace_period_end: "1785864322360"
 *                - domain: "koin"
 *                  name: "grayson"
 *                  owner: "1KuiXi7Kdby37k9cW6RNDk2ZMJvDKBMa5q"
 *                  expiration: "1779715794620"
 *                  grace_period_end: "1784899794620"
 */

export async function GET(request: Request, { params }: { params: { account: string } }) {
  try {
    const account = await getAddress(params.account)

    try {
      const names = await getKAPNames(account)

      return Response.json({
        names
      })
    } catch (error) {
      throw new AppError(getErrorMessage(error as Error))
    }
  } catch (error) {
    return handleError(error as Error)
  }
}
