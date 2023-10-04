import { config } from '@/app.config'
import { getProvider } from '@/utils/providers'
import { Contract } from 'koilib'
import KapAbi from '@/abis/kap.json'

type KapName = {
  owner: string
  name: string
  domain: string
  expiration: string
  grace_period_end: string
}

function getContract(): Contract {
  return new Contract({
    id: config.contracts.kap,
    // @ts-ignore abi is compatible
    abi: KapAbi,
    provider: getProvider()
  })
}

export async function getKAPName(name: string): Promise<KapName | undefined> {
  const contract = getContract()

  const { result } = await contract.functions.get_name<KapName>({
    name
  })

  return result
}

export async function getKAPNames(owner: string): Promise<KapName[]> {
  const contract = getContract()

  const { result } = await contract.functions.get_names<{
    names: KapName[]
  }>({
    owner
  })

  if (!result) {
    return []
  }

  return result.names
}
