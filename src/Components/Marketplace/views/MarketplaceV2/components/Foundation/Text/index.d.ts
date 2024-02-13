import { POSITION, Margins, Paddings } from 'views/MarketplaceV2/styles/index.d'

export type WrapperProps = {
  align?: string
  lineHeight?: string
} & Margins &
  Paddings

export type TextProps = {
  fsize?: string
  fstyle?: string
  weight?: number
} & Margins &
  Paddings
