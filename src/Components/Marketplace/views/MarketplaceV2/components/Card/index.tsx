import React, { useMemo, useCallback } from 'react'
import Web3 from 'web3'
import { useHistory } from 'react-router-dom'
import useMarketplaceV2, { useQueryAsset, QueryType } from 'hooks/useMarketplaceV2'
import useTheme from 'hooks/useTheme'
import { Props } from './index.d'
import { CardContainer, Details, CardText as TextBox, Button } from './styled'
import { H5, P } from '../Foundation/Text'
import PurchaseNFT from '../Modals/Buy-nft'
import Header from './Header'
import SpriteDisplay from './Display'
import ABI from '../../constants/abi.json'
import { Web3Button } from "@thirdweb-dev/react";

export default function Card(props: Props) {
  const { theme } = useTheme()
  const { id, listingId, name, spriteName, rarity, price, badge } = props
  const { controllers } = useMarketplaceV2()
  const { modal } = controllers
  const history = useHistory()

  const handleNav = (event) => {
    event.preventDefault()

    history.push(`/marketplace/${badge}/${id}`)
  }

  const handleBuy = async (event) => {
    event.stopPropagation()
  };  

  return (
    <>
      <CardContainer className="secondary-drop-shadow">
        <Header {...{ name, rarity, badge }} />
        {/* <SpriteDisplay {...{ id, spriteName }} style={{margin: '0 10px'}} /> */}
        <img src={spriteName} />
        <Details className="flex">
          <TextBox className="flex-none w-1/2">
            <H5 fsize="0.8em">Current Price</H5>
            <P fsize="1em" color={theme.colors.MGG_accent2}>
              {price.token}
            </P>
          </TextBox>
          <Web3Button
            contractAddress={process.env.REACT_APP_MARKETPLACE_ADDRESS} // Your smart contract address
            contractAbi={ABI}
            action={async (contract) => {
              await contract.call("buy", [listingId], { value: price.raw });
            }}
            className='flex-1 with-animation-tilt-n-move-shaking w-2/6'
            style={{ minWidth: "0", maxWidth: "50%", wordBreak: "break-word", textAlign: "center" }}
          >
            Buy
          </Web3Button>
        </Details>
      </CardContainer>
      {modal.openModal[`buy-${listingId}`] && <PurchaseNFT {...props} />}
    </>
  )
}