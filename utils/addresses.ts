import { config } from '@/app.config'
import { getKAPName } from '@/services/kap'
import { utils } from 'koilib'
import { AppError } from './errors'

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

export async function getAccountAddress(str: string) {
  let address = str

  if (!address) {
    throw new AppError('missing account')
  }

  address = await getAddress(address)

  try {
    if (!utils.isChecksumAddress(address)) {
      throw new AppError('invalid account')
    }
  } catch (error) {
    throw new AppError('invalid account')
  }

  return address
}
