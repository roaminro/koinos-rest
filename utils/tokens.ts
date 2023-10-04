import { Contract } from 'koilib'
import ftAbi from '@/abis/ft.json'
import nftAbi from '@/abis/nft.json'
import { getProvider } from './providers'

export function getFTContract(id: string) {
  return new Contract({
    id,
    provider: getProvider(),
    // @ts-ignore
    abi: ftAbi
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
