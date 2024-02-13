import React from 'react'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import { Flex } from '@metagg/mgg-uikit'
import { useMarketplaceV2FetchData } from 'hooks/useMarketplaceV2Data'
import Card from 'views/MarketplaceV2/components/Card'

const Nftlist = () => {
  const { data } = useMarketplaceV2FetchData()
  const [toDisplay, setToDisplay] = React.useState<number>(6)

  const handleDisplay = () => {
    if (toDisplay !== data.length) {
      setToDisplay(toDisplay + 3)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Grid container spacing={{ xs: 2, sm: 4 }} {...settings} pt={5}>
        {data.slice(0, toDisplay).map((d) => (
          <Grid key={d.name} item xs={12} sm={4} md={3} lg={3} xl={3} justifyContent="center">
            <StyledFlex>
              <Card {...d} />
            </StyledFlex>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '1.5rem' }}>
        {toDisplay <= data.length && (
          <button onClick={handleDisplay} type="button">
            view more
          </button>
        )}
      </div>
    </div>
  )
}

export default Nftlist

const settings = {
  justifyContent: 'flex-start',
  alignItems: 'center',
}

const StyledFlex = styled(Flex)`
  max-width: 250px;
  // padding: 5px 10px;
  margin: 0 auto;
  ${({ theme }) => `
    ${theme.mediaQueries.xl} {
      max-width: 100%;
    }
  `}
`
