/**
 * @swagger
 * components:
 *  schemas:
 *    ResourceLimits:
 *      type: object
 *      properties:
 *        resource_limit_data:
 *          type: object
 *          properties:
 *            disk_storage_limit:
 *              type: string
 *            disk_storage_cost:
 *              type: string
 *            network_bandwidth_limit:
 *              type: string
 *            network_bandwidth_cost:
 *              type: string
 *            compute_bandwidth_limit:
 *              type: string
 *            compute_bandwidth_cost:
 *              type: string
 */

export type ResourceLimits = {
  resource_limit_data: {
    disk_storage_limit: string
    disk_storage_cost: string
    network_bandwidth_limit: string
    network_bandwidth_cost: string
    compute_bandwidth_limit: string
    compute_bandwidth_cost: string
  }
}
