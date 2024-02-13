import { TranslatableText } from '../../state/types'
import BigNumber from 'bignumber.js'

export interface Address {
  97?: string
  1?: string
  56?: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  busdPrice?: string
  iconExtension?: string | 'svg'
}

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  distributionRatio: number // Range [0-1]
}

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  currency: Token
  token: Token
  releaseBlockNumber: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  version: number
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
}

export interface Ino {
  id: string
  isActive: boolean
  address: string
  name: string
  currency: Token
  token: Token
  releaseBlockNumber: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  version: number
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
}

export enum FarmCategory {
  'VAULT' = 'Vault',
  'CORE' = 'Core',
}

export interface FarmConfig {
  isMain?: boolean
  comingSoon?: boolean
  pid: number
  name?: string
  chain?: string
  lpSymbol: string
  lpAddresses: Address
  stakingAddresses: Address
  token: Token
  pairToken: Token
  quoteToken: Token
  farmCategory?: FarmCategory
  multiplier?: string
  isCommunity?: boolean
  liquidityUrl?: string
  infoURL?: string
  isPromoted?: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
  UIProps?: UIProps
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
  'AUTO' = 'Auto',
  'FIXEDAPR' = 'FixedApr',
}

export interface PoolConfig {
  isMain?: boolean
  comingSoon?: boolean
  name?: string
  chain?: string
  sousId: number
  earningToken: Token
  stakingToken: Token
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  isComingSoon?: boolean
  enableEmergencyWithdraw?: boolean
  isAddTokenDisabled?: boolean
  isDepositDisabled?: boolean
  isWithdrawDisabled?: boolean
  UIProps?: UIProps
  fixedAprConfigs?: {
    tiers: Tiers[]
    maxFine: number
  }
}

export interface Tiers {
  id: string
  duration: number
  APR: number
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type NftSource = {
  [key in NftType]: {
    address: Address
    identifierKey: string
  }
}

export enum NftType {
  PANCAKE = 'pancake',
  MIXIE = 'mixie',
}

export type Nft = {
  description: string
  name: string
  images: NftImages
  sortOrder: number
  type: NftType
  video?: NftVideo

  // Uniquely identifies the nft.
  // Used for matching an NFT from the config with the data from the NFT's tokenURI
  identifier: string

  // Used to be "bunnyId". Used when minting NFT
  variationId?: number | string
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo' | 'teambattle'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}

export type PageMeta = {
  title: string
  description?: string
  image?: string
  favico?: string
}

export type Status = 'ongoing' | 'upcoming' | 'completed' | null
export type Type = 'INO' | 'IDO' | 'IGO'
export type Distribution = 'VESTING' | 'SELF-CLAIM' | 'AIRDROP'
export const GUILDPAD_STATUS: { ongoing: Status; upcoming: Status; completed: Status } = {
  ongoing: 'ongoing',
  upcoming: 'upcoming',
  completed: 'completed',
}
export const TYPE: { INO: Type; IDO: Type; IGO: Type } = { INO: 'INO', IDO: 'IGO', IGO: 'IGO' }
export const DISTRIBUTION: { VESTING: Distribution; SELF_CLAIM: Distribution; AIRDROP: Distribution } = {
  VESTING: 'VESTING',
  SELF_CLAIM: 'SELF-CLAIM',
  AIRDROP: 'AIRDROP',
}

export interface Socials {
  [key: string]: string
}

export interface UIProps {
  socials?: Socials
  contain?: boolean
  bgColor?: string
}

type InoDetails = {
  price?: string
  ratio?: string
  boxes?: string
  priceFiat?: string
}

type IgoDetails = {
  price?: string
  fundsTarget?: string
}

type IdoDetails = {
  price?: string
  startTime?: string
  tokenRate?: string
  expectedSales?: string
  totalParticipants?: string
  percentage?: string
}

interface GuildPadInformation {
  title: string
  description: string
  distribution?: string
  distributionDesc?: string
  round: string
  type?: Type | string
  merged?: boolean
  nextRoundID?: number
  date?: { start: string; end: string }
  status: Status
  hasStarted?: boolean
  hasEnded?: boolean
  totalSupply?: string
  remainingSupply?: string
  totalSold?: string
  totalRaise?: string
  buyLimitEnabled?: boolean
  whitelistEnabled?: boolean
  display?: boolean
  nextRoundDate?: number
  buyLimit?: string
  socials?: Socials
  inoDetails?: InoDetails
  igoDetails?: IgoDetails
  price?: string
  startTime?: string
  tokenRate?: string
  expectedSales?: string
  totalParticipants?: string
  percentage?: string
  epochEndDate?: number
}

export interface GuildpadConfig extends GuildPadInformation {
  id: number
  isStatic: boolean
  contractAddress?: Address
  vestingAddress?: Address
  FundstoRaise?: string
  buyingCoin?: Token
  sellingCoin?: Token
  projectTokenEquivalent?: string
  asOfPriceInProjectToken?: number
  available?: string
  boxDetails?: any
  boxInfo?: {
    1: {
      price: string
      supply: string
      sold: string
      percentSold?: string
    }
  }
}
