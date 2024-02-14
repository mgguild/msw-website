import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { COLORS, DEFAULT_BORDERS } from 'views/MarketplaceV2/styles/constants'
import SpriteDisplay from 'views/MarketplaceV2/components/Card/Display'
import Header from 'views/MarketplaceV2/components/Card/Header'
import { NftProps } from './index.d'



const NftCard = (props: NftProps) => {
  const { name, spriteName, rarity, price, badge } = props
  const history = useHistory()
  const handleNav = (event) => {
    event.preventDefault()
    history.push(`/marketplace/${badge}/${name}`)
  }

  return (
    <Container className="secondary-drop-shadow" onClick={handleNav}>
      <Header {...{ name, rarity, badge }} />
      <SpriteDisplay {...{ spriteName }} />
    </Container>
  )
}

export default NftCard

const Container = styled.div`
  border: ${DEFAULT_BORDERS};
  border-radius: 10px;
  padding: 0.5em 0px 2em 0px;
  cursor: pointer;
  outline: solid 0px ${COLORS.BORDER};
  transition: outline 0.1s ease;
  &:hover {
    outline-width: 5px;
  }
`