import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MetaGaming Guild',
  description: 'Stake MGG and earn token rewards',
  image: '%PUBLIC_URL%/MGG.png',
  favico: `${window.location.origin}/favicon-v1.ico`,
}

export const MARKETPLACE_META: PageMeta = {
  title: 'MSW Marketplace',
  description: 'MSW Marketplace',
  image: `${window.location.origin}/marketplace-assets/logo/MSW Logo.png`,
  favico: `${window.location.origin}/favicon-v2.ico`,
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/farms':
      return {
        title: `${t('Liquidity')} | ${t('MGG')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('MGG')}`,
      }
    case '/gamefi':
      return {
        title: `${t('GameFi Vaults')} | ${t('MGG')}`,
      }
    case '/launchpad':
      return {
        title: `${t('MetaGaming Pad')} | ${t('MGG')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('MGG')}`,
      }
    default:
      return null
  }
}

export const getPadCustomMeta = (launchpad: string): PageMeta => {
  return {
    title: `MGG Guildpad > ${launchpad}`,
  }
}

export const getMarketplaceMeta = (path: string): PageMeta => {
  return {
    title: `MSW Marketplace`,
  }
}
