import React, { useMemo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import useMarketplaceV2, { useQueryAsset, QueryType } from '../../../../hooks/useMarketplaceV2'
import useTheme from '../../../../hooks/useTheme'
import { Props } from './index.d'
import { CardContainer, Details, CardText as TextBox, Button } from './styled'
import { H5, P } from '../Foundation/Text'
import PurchaseNFT from '../Modals/Buy-nft'
import Header from './Header'
import SpriteDisplay from './Display'

export default function Card(props: Props) {
  const { theme } = useTheme()
  const { name, spriteName, rarity, price, badge } = props
  const { controllers } = useMarketplaceV2()
  const { modal } = controllers
  const history = useHistory()

  const handleNav = (event: any) => {
    event.preventDefault()

    history.push(`/marketplace/${badge}/${name}`)
  }

  const handleBuy = (event: any) => {
    event.stopPropagation()
    modal.handleOpen(`buy-${name}`)
  }

  return (
    <>
      <CardContainer className="secondary-drop-shadow" onClick={handleNav}>
        <Header {...{ name, rarity, badge }} />
        <SpriteDisplay {...{ spriteName }} style={{ margin: '0 10px' }} />
        <Details>
          <TextBox>
            <H5 fsize="0.8em">Current Price</H5>
            <P fsize="1em" color={theme!.colors.MGG_accent2}>
              {price.token}
            </P>
            <P fsize="0.8em">${price.fiat}</P>
          </TextBox>
          <Button onClick={handleBuy} className="with-animation-tilt-n-move-shaking">
            BUY
          </Button>
        </Details>
      </CardContainer>
      {modal.openModal[`buy-${name}`] && <PurchaseNFT {...props} />}
    </>
  )
}
