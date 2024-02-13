import { MAINNET_CHAIN_ID } from '../config'
import addresses from '../config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address, chainId = MAINNET_CHAIN_ID): string => {
  return address[chainId] ?? address[MAINNET_CHAIN_ID]
}

export const getCakeAddress = () => {
  return getAddress(tokens.cake.address)
}
export const getMasterChefAddress = (chainId = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMulticallAddress = (chainId = MAINNET_CHAIN_ID) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}
