import React from 'react'
import { AuthContextProvider } from '../../../contexts/AuthContext'
import { MarketplaceV2Provider } from '../../../contexts/MarketplaceContext'
import { MarketplaceV2DataProvider } from '../../../contexts/MarketplaceDataContext'
import ModalProvider from './ModalProvider'

const MarketplaceProviders: React.FC<{ children: React.ReactNode }> = ( {children} ) => {
  return (
    <AuthContextProvider>
      <MarketplaceV2Provider>
        <MarketplaceV2DataProvider>
          {children}
          <ModalProvider />
        </MarketplaceV2DataProvider>
      </MarketplaceV2Provider>
    </AuthContextProvider>
  )
}

export default MarketplaceProviders
