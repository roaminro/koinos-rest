import { config } from '@/app.config'
import { getKAPName } from '@/services/kap'

export async function getAddress(str: string) {
  // system contracts
  if (config.systemContracts[str]) {
    return config.systemContracts[str]
  }
  // kap names
  else if (str.endsWith('.koin')) {
    const kapName = await getKAPName(str)

    if (kapName) {
      return kapName.owner
    }
  }

  return str
}
