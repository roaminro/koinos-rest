import { Provider, Contract, utils } from 'koilib'
import { config } from '@/app.config'
import nftAbi from '@/abis/nft.json'

export function getFTContract(id: string) {
  const provider = new Provider(config.jsonRPC)

  return new Contract({
    id,
    provider,
    abi: utils.tokenAbi
  })
}

export function getNFTContract(id: string) {
  const provider = new Provider(config.jsonRPC)

  return new Contract({
    id,
    provider,
    // @ts-ignore
    abi: nftAbi
  })
}
