import { Contract, utils } from 'koilib'
import nftAbi from '@/abis/nft.json'
import { getProvider } from './providers'

export function getFTContract(id: string) {
  const provider = getProvider()

  return new Contract({
    id,
    provider,
    abi: utils.tokenAbi
  })
}

export function getNFTContract(id: string) {
  const provider = getProvider()

  return new Contract({
    id,
    provider,
    // @ts-ignore
    abi: nftAbi
  })
}
