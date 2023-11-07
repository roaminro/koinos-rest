import { Contract, utils } from 'koilib'
import { config } from '@/app.config'
import { getProvider } from '@/utils/providers'
import Nicknames from '@/abis/nicknames.json'

type Nickname = { token_id: string }

function getContract(): Contract {
  return new Contract({
    id: config.contracts.nicknames,
    // @ts-ignore abi is compatible
    abi: Nicknames,
    provider: getProvider()
  })
}

export async function getNicknameOwner(name: string): Promise<Nickname | undefined> {
  const contract = getContract()
  const stringToHex = `0x${utils.toHexString(new TextEncoder().encode(name))}`

  const { result } = await contract.functions.owner_of<{ token_id: string }>({
    token_id: stringToHex
  })

  return result
}

export async function getNicknamesOwned(owner: string): Promise<Nickname[]> {
  const contract = getContract()
  const stringToHex = `0x${utils.toHexString(new TextEncoder().encode(owner))}`

  const { result } = await contract.functions.get_tokens_by_owner<{
    names: Nickname[]
  }>({
    stringToHex
  })

  if (!result) {
    return []
  }

  return result.names
}
