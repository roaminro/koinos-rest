import { getFTContract } from '@/utils/tokens'
import { ChainId, Fetcher, Token, Pair } from '@koindx/v2-sdk'
import BigNumber from 'bignumber.js'
import { Provider, utils } from 'koilib'

const KOINDX_NATIVE_TOKENS: Record<string, string> = {
  '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL': 'koin',
  '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr': 'vhp'
}

export async function getPair(
  tokenAAddress: string,
  tokenBAddress: string,
  provider: Provider
): Promise<Pair | undefined> {
  const tokenAContract = getFTContract(tokenAAddress)
  const tokenBContract = getFTContract(tokenBAddress)

  const chainId = await provider.getChainId()

  const { result: tokenADec } = await tokenAContract.functions.decimals()
  const { result: tokenBDec } = await tokenBContract.functions.decimals()

  const tokenA = new Token(
    chainId as ChainId,
    KOINDX_NATIVE_TOKENS[tokenAAddress] || tokenAAddress,
    tokenADec!.value
  )
  const tokenB = new Token(
    chainId as ChainId,
    KOINDX_NATIVE_TOKENS[tokenBAddress] || tokenBAddress,
    tokenBDec!.value
  )

  let pair = await Fetcher.fetchPairData(chainId as ChainId, tokenA, tokenB, provider)

  if (!pair.address) {
    return undefined
  }

  // if pair is wrongly sorted
  if (pair.token_0.address <= pair.token_1.address) {
    const token0 = pair.token_0
    // @ts-ignore
    pair.token_0 = pair.token_1
    // @ts-ignore
    pair.token_1 = token0
  }

  return pair
}

export function getQuote(pair: Pair, tokenA: string, amountA: string) {
  const amountAbn = new BigNumber(utils.parseUnits(amountA, pair.token_0.decimals))

  const tokenAddress = KOINDX_NATIVE_TOKENS[tokenA] || tokenA

  const token = pair.token_0.address === tokenAddress ? pair.token_1 : pair.token_0

  const quote = pair.getQuote(token, amountAbn)

  return utils.formatUnits(quote.integerValue().toString(10), pair.token_1.decimals)
}
