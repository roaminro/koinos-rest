import { Contract, utils } from 'koilib'
import { config } from '@/app.config'
import { getProvider } from '@/utils/providers'
import Nicknames from '@/abis/nicknames.json'

type Nickname = {}

function getContract(): Contract {
  return new Contract({
    id: config.systemContracts.nameservice,
    // @ts-ignore abi is compatible
    abi: Nicknames,
    provider: getProvider()
  })
}

export async function getNicknameOwner(name: string): Promise<Nickname | undefined> {
  const stringToHex = `0x${utils.toHexString(new TextEncoder().encode(name))}`

  const contract = getContract()  

  const { result } = await contract.functions.owner_of<{ account: string }>({
    stringToHex
  })

  return result
}

export async function getNicknamesOwned(owner: string): Promise<Nickname[]> {
  const contract = getContract()

  const { result } = await contract.functions.get_names<{
    names: Nickname[]
  }>({
    owner
  })

  if (!result) {
    return []
  }

  return result.names
}
