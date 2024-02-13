import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import { Flex, IconButton } from '@metagg/mgg-uikit'
import { useMarketplaceV2FetchData } from 'hooks/useMarketplaceV2Data'
import BasicTooltip from 'views/MarketplaceV2/components/Foundation/Tooltip'
import MarketPlaceButton from 'views/MarketplaceV2/components/Foundation/Button'
import { P, H2, TextWrapper } from 'views/MarketplaceV2/components/Foundation/Text'
import { MiniBox } from 'views/MarketplaceV2/components/Foundation/Box'
import Iconloader from 'views/MarketplaceV2/components/Foundation/Iconloader'
import { StyledButton } from 'views/MarketplaceV2/components/Foundation/Button/styled'
import { ContentWrapper, StyledBox } from './styled'
import CategoryBox from './Cat-Box'
import NftCard from './NftCard'

const CategoryList = ({ active, setActive }) => (
  <Grid container columnGap={3} sx={{ margin: '0.5em 0px 2em 0px' }}>
    <Grid item className="with-animation-enlarge">
      <IconButton onClick={() => setActive(0)}>
        <CategoryBox active={active} ind={0} />
      </IconButton>
    </Grid>
    <Grid item className="with-animation-enlarge">
      <IconButton onClick={() => setActive(1)}>
        <CategoryBox active={active} ind={1} />
      </IconButton>
    </Grid>
  </Grid>
)

const DisplayNft = ({ data }) => {
  return (
    <Grid container wrap="wrap" spacing={5}>
      {data.map((d) => (
        <Grid item xs={12} md={6}>
          <NftCard {...d} />
        </Grid>
      ))}
    </Grid>
  )
}

const NftCollection = (props) => {
  // TODO: Update to display user owned NFTs
  const { data } = useMarketplaceV2FetchData()
  const [active, setActive] = useState(0)
  return (
    <ContentWrapper>
      <StyledBox p="1em">
        <Flex alignItems="center" justifyContent="space-between">
          <H2 fsize="1.2em">OWNED CHARACTERS/ITEMS</H2>
          <Flex justifyContent="space-between" alignItems="center" flex="0.2">
            <BasicTooltip title="Owned Characters or Items">
              <MiniBox>
                <Iconloader type="fa" name="InfoCircle" fontSize="1em" />
              </MiniBox>
            </BasicTooltip>

            <MarketPlaceButton variant="text" title="Item List" style={{ justifyContent: 'center' }} height="50%" />
          </Flex>
        </Flex>

        <Content>
          <CategoryList {...{ active, setActive }} />
          <DisplayNft data={data} />
        </Content>
      </StyledBox>
    </ContentWrapper>
  )
}

export default NftCollection

const Content = styled.div``
