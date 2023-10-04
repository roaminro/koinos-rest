import { interfaces } from 'koilib'
import { getContract } from './contracts'

export async function decodeEvents(events: interfaces.EventData[]) {
  for (let index = 0; index < events.length; index++) {
    const event = events[index]
    const contract = await getContract(event.source, false)

    if (contract && contract.functions) {
      const decodedEvent = await contract.decodeEvent(event)

      events[index] = {
        sequence: decodedEvent.sequence,
        source: decodedEvent.source,
        name: decodedEvent.name,
        // @ts-ignore
        data: decodedEvent.args,
        impacted: decodedEvent.impacted
      }
    }
  }

  return events
}
