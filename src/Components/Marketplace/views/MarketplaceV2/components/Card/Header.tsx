import React from 'react'
import { Flex as Div } from '@metagg/mgg-uikit'
import { QueryType, useQueryAsset } from '../../../../hooks/useMarketplaceV2'
import { GoogleDriveLink } from '../../../../views/MarketplaceV2/constants/config'
import { CardHeader as HeaderBox, CardText as TextBox } from './styled'
import { H2, P } from '../Foundation/Text'
import { RarityColors } from './index.d'
import RenderCircles from './Circles'
import SvgIcon from '../Foundation/SvgIcon'
import Anchor from '../Foundation/Anchor'

type Props = {
  name: string
  rarity: string
  badge: string
}

const Header: React.FC<Props> = ({ name, rarity, badge }) => {
  const badgeId = useQueryAsset({ name: badge, type: QueryType.BADGES })
  const src = GoogleDriveLink + badgeId
  const Img = <img alt="logo" src={src} />

  return (
    <HeaderBox>
      <TextBox>
        <Anchor href={`/marketplace/${badge}/${name}`}>
          <H2>{name.toUpperCase()}</H2>
        </Anchor>
        <Div alignItems="center">
          <P color={RarityColors[`${rarity.toUpperCase()}`]} fsize="0.8em">
            {rarity}
          </P>
          &nbsp;
          <RenderCircles />
        </Div>
      </TextBox>
      <SvgIcon Img={Img} width={50} height={50} />
    </HeaderBox>
  )
}

export default Header
