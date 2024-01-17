import { Serializer, interfaces, utils } from 'koilib'
import { getContract } from './contracts'
import koinosJson from '@koinos/proto-js/index.json'
// @ts-ignore
const serializer = new Serializer(koinosJson)

export async function decodeEvents(events: interfaces.EventData[]) {
  for (let index = 0; index < events.length; index++) {
    const event = events[index]

    // if the event has no source, try decoding the event data using the known Koinos protos
    if (!event.source) {
      try {
        // @ts-ignore
        events[index].data = await serializer.deserialize(event.data, event.name)
      } catch (error) {
        // ignore decoding errors
      }
    } else {
      const contract = await getContract(event.source, false)

      if (contract && contract.functions) {
        try {
          // patch event name for non-compliant token contracts
          if (event.name.endsWith('token.burn_event') || event.name.endsWith('token.burn')) {
            event.name = 'koinos.contracts.token.burn_event'
          } else if (event.name.endsWith('token.mint_event') || event.name.endsWith('token.mint')) {
            event.name = 'koinos.contracts.token.mint_event'
          } else if (
            event.name.endsWith('token.transfer_event') ||
            event.name.endsWith('token.transfer')
          ) {
            event.name = 'koinos.contracts.token.transfer_event'
          } else if (event.name.endsWith('token.approve')) {
            event.name = 'token.approve_event'
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
  }

  return events
}
