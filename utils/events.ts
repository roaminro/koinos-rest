import { interfaces } from 'koilib'
import { getContract } from './contracts'

export async function decodeEvents(events: interfaces.EventData[]) {
  for (let index = 0; index < events.length; index++) {
    const event = events[index]
    const contract = await getContract(event.source, false)

    if (contract && contract.functions) {
      try {
        // patch event name for non-compliant token contracts
        if (event.name.endsWith('token.burn_event')) {
          event.name = 'koinos.contracts.token.burn_event'
        } else if (event.name.endsWith('token.mint_event')) {
          event.name = 'koinos.contracts.token.mint_event'
        } else if (event.name.endsWith('token.transfer_event')) {
          event.name = 'koinos.contracts.token.transfer_event'
        }

        const decodedEvent = await contract.decodeEvent(event)

        events[index] = {
          sequence: decodedEvent.sequence,
          source: decodedEvent.source,
          name: decodedEvent.name,
          // @ts-ignore
          data: decodedEvent.args,
          impacted: decodedEvent.impacted
        }
      } catch (error) {
        // ignore decoding errors
      }
    }
  }

  return events
}
