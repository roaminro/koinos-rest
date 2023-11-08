import { Contract, utils } from 'koilib'
import { config } from '@/app.config'
import { getProvider } from '@/utils/providers'
import Nicknames from '@/abis/nicknames.json'

type Nickname = { account: string }

function getContract(): Contract {
  return new Contract({
    id: config.contracts.nicknames,
    // @ts-ignore abi is compatible
    abi: Nicknames,
    provider: getProvider()
  })
}

export async function getNicknameOwner(name: string): Promise<string | undefined> {
  const contract = getContract()
  const token_id = `0x${utils.toHexString(new TextEncoder().encode(name.replace('@', '')))}`

  const { result } = await contract.functions.owner_of<Nickname>({
    token_id
  })

  return result?.account
}

export async function getNicknamesOwned(owner: string): Promise<string[]> {
  const contract = getContract()
  const stringToHex = `0x${utils.toHexString(new TextEncoder().encode(owner))}`

  const { result } = await contract.functions.get_tokens_by_owner<{
    token_ids: string[]
  }>({
    stringToHex
  })

  const names = result?.token_ids
    .map((tokenId) => new TextDecoder().decode(utils.toUint8Array(tokenId.slice(2))))
    .sort()

  if (!names) {
    return []
  }

  return names
}
