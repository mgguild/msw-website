import React from 'react'
import { Button as MGGButton, Flex as DetailsBox } from '@metagg/mgg-uikit'
import useTheme from '../../../../hooks/useTheme'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import MarketPlaceButton from '../Foundation/Button'
import ModalComponent, { ConfirmComponent } from './Modal'
import { ModalSection } from './styled'
import { ActionWrapper, Container } from './styled-buy-nft'
import Header from '../Card/Header'
import Display from '../Card/Display'
import { H4, P, TextWrapper as NoteBox, H3, TextWrapper } from '../Foundation/Text'
import { CONFIRM_TYPE, warningMsg } from './index.d'

const PurchaseNFT: React.FC<any> = (props) => {
  const { theme } = useTheme()
  const { name, rarity, badge, spriteName } = props
  const { controllers } = useMarketplaceV2()
  const { modal } = controllers

  const [isPurchaseNft, setIsPurchaseNft] = React.useState<boolean>(false)
  const handleBuy = () => {
    setIsPurchaseNft(true)
  }

  const renderMain = () => (
    <Container>
      <Header {...{ name, rarity, badge }} />
      <Display {...{ spriteName }} />
      <DetailsBox justifyContent="space-between" margin="1rem 0">
        <H4>PURCHASE AMOUNT</H4>
        <H4 color={theme!.colors.MGG_accent2}>12,345 MGG</H4>
      </DetailsBox>
      <NoteBox align="center">
        <P color={theme!.colors.textSubtle} fsize="0.7em">
          {warningMsg}
        </P>
      </NoteBox>
      <ActionWrapper>
        <MarketPlaceButton
          variant="text"
          style={{ justifyContent: 'center' }}
          onClick={() => modal.handleClose(`buy-${name}`)}
        >
          <TextWrapper>
            <H3>Cancel</H3>
          </TextWrapper>
        </MarketPlaceButton>
        <MGGButton className="with-animation-enlarge" onClick={handleBuy}>
          <TextWrapper>
            <H3>BUY</H3>
          </TextWrapper>
        </MGGButton>
      </ActionWrapper>
    </Container>
  )

  // sample state for confirmation message

  const confirmMsg = {
    type: CONFIRM_TYPE.success,
    icon: 'CheckCircle',
    description: `
      Your purchase has been completed. You can check your purchased items from 'My Page'
    `,
  }

  return (
    <ModalComponent type={`buy-${name}`}>
      <ModalSection>{isPurchaseNft ? <ConfirmComponent {...confirmMsg} /> : renderMain()}</ModalSection>
    </ModalComponent>
  )
}

export default PurchaseNFT
