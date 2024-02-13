import React from 'react'
import styled from 'styled-components'
import { COLORS, DEFAULT_BORDERS, PADDING } from '../../../../views/MarketplaceV2/styles/constants'
import { useFetchImg } from '../../../../utils/assetFetch'
import useTheme from '../../../../hooks/useTheme'
import SvgIcon from '../Foundation/SvgIcon'
import { H4, P, TextWrapper } from '../Foundation/Text'
import Link from '../Foundation/Anchor'

export default function Box({ src }: { src: { name: string; folder: string } }): JSX.Element {
  const { theme } = useTheme()
  const source = useFetchImg(src)
  const Img = <img alt="logo" src={source} />

  return (
    <BoxContainer className="main-drop-shadow" data-aos="flip-down">
      <SvgIcon Img={Img} />
      <TextWrapper align="center">
        <Link href="/marketplace/nft" className="shc-nav">
          <H4 fsize="0.9em" color={theme!.colors.MGG_accent1}>
            Click here to buy
          </H4>
        </Link>
        <P fsize="0.7em">Until x/x lorem ipsum</P>
      </TextWrapper>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${PADDING.CONTAINER.SP}px;
  justify-content: space-between;
  margin-bottom: 5px;
  border-radius: 4px;
  background-color: ${COLORS.CONTAINER};
  & > * {
    flex: 1;
  }

  ${({ theme }) => `
    ${theme.mediaQueries.lg} {
      padding: ${PADDING.CONTAINER.LG}px;
    }
  `}
`
