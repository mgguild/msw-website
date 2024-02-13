import React from 'react'
import useMarketplaceV2 from 'hooks/useMarketplaceV2'
import BuyModal from '../components/Modals/Buy-token'

const ModalProvider = () => {
  const { controllers } = useMarketplaceV2()
  const { modal } = controllers

  return <>{modal.openModal['buy-token'] && <BuyModal />}</>
}

export default ModalProvider
