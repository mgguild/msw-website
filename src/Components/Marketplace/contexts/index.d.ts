export type TYPE_ANCHOR = 'top' | 'left' | 'bottom' | 'right'

export enum CLASSES {
  archer = 'Archer',
  artillery = 'Artillery',
  berserker = 'Berserker',
  darkKnight = 'Dark Knight',
  elemental = 'Elemental',
  engineer = 'Engineer',
  knight = 'Knight',
  magitek = 'Magitek',
  musketeer = 'Musketeer',
  plagueDoc = 'Plague Doctor',
  vicar = 'Vicar',
  wizard = 'Wizard',
}

export type Price = {
  raw: string
  token: string
  fiat: string
}

export type CardType = {
  id: string
  listingId?: string
  name: string
  spriteName: string
  rarity: string
  badge: CLASSES
  price: Price
}
