import { Contract } from 'koilib'
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

export async function getNickname(name: string): Promise<Nickname | undefined> {
  const contract = getContract()
  console.log(contract);
  

  const { result } = await contract.functions.get_name<Nickname>({
    name
  })

  return result
}

export async function getNicknames(owner: string): Promise<Nickname[]> {
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
