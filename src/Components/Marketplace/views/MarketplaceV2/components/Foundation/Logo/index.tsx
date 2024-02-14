import React from 'react'
import styled from 'styled-components'
import { useFetchImg } from '../../../../../utils/assetFetch'
import { PADDING } from '../../../styles/constants'
import { LOGO, marketplaceURL } from '../../../constants/config'
import SvgIcon from '../SvgIcon'
import Anchor from '../Anchor'

const LogoHolder = styled.div<{ max?: number }>`
  max-width: ${(props) => props.max ?? 80}px;
  width: ${(props) => (props.max ? `calc(${props.max}px - 5px)` : '70px')};
  padding: ${PADDING.SP}px;

  /* ${(props) => `
    ${props.theme.mediaQueries.sm} {
      max-width: ${props.max ? `calc(${props.max}px + 15px)` : '90px'};
      width: ${props.max ? `calc(${props.max - 5}px + 15px)` : '85px'};
    }
    ${props.theme.mediaQueries.xl} {
      max-width: ${props.max ? `calc(${props.max}px + 50px)` : '140px'};
      width: ${props.max ? `calc(${props.max - 5}px + 50px)` : '135px'};
    }
  `} */
`

export default function Logo({ size, url }: { size?: number; url?: string }) {
  const src = useFetchImg({ name: LOGO })
  const Img = <img alt="logo" src={src} />

  return (
    <Anchor href={url}>
      <LogoHolder max={size}>
        <SvgIcon Img={Img} />
      </LogoHolder>
    </Anchor>
  )
}

Logo.defaultProps = {
  size: null,
  url: ''
}
