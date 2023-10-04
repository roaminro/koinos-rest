import { Contract, utils } from 'koilib'
import nftAbi from '@/abis/nft.json'
import { getProvider } from './providers'

export function getFTContract(id: string) {
  return new Contract({
    id,
    provider: getProvider(),
    abi: utils.tokenAbi
  })
}

export function getNFTContract(id: string) {
  return new Contract({
    id,
    provider: getProvider(),
    // @ts-ignore
    abi: nftAbi
  })
}
