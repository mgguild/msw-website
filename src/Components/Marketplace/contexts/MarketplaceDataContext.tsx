import React, { createContext } from 'react'
import { CardType, CLASSES } from './index.d'

export const MarketplaceV2DataContext = createContext<any>(null)
export const MarketplaceV2DataProvider = ({ children }) => {
  const [nftsState, setNftsState] = React.useState<CardType[] | []>([])
  const [classesState, setClassesState] = React.useState<any[]>([])

  React.useEffect(() => {
    setNftsState(placeholder)
    setClassesState(classes)
  }, [])

  return (
    <MarketplaceV2DataContext.Provider
      value={{
        data: {
          nfts: nftsState,
          classes: classesState,
        },
      }}
    >
      {children}
    </MarketplaceV2DataContext.Provider>
  )
}

const classes = [
  'Archer',
  'Artillery',
  'Berserker',
  'Dark Knight',
  'Elemental',
  'Engineer',
  'Knight',
  'Magitek',
  'Musketeer',
  'Plague Doctor',
  'Vicar',
  'Wizard',
]

const placeholder: CardType[] = [
  {
    name: 'Voidmancer',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: CLASSES.wizard,
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
  {
    name: 'Voidmancer2',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: CLASSES.wizard,
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
  {
    name: 'Voidmancer3',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: CLASSES.wizard,
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
  {
    name: 'Voidmancer4',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: CLASSES.wizard,
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
  {
    name: 'Voidmancer5',
    spriteName: 'Voidmancer- Wizard',
    rarity: 'Rare',
    badge: CLASSES.wizard,
    price: {
      token: '100 MGG',
      fiat: '1000',
    },
  },
]
