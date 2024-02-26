import React from 'react'
import styled from 'styled-components'
import { HEIGHT, PADDING } from '../../../../views/MarketplaceV2/styles/constants'
import { links, mswURL } from '../../../../views/MarketplaceV2/constants/config'
import Logo from '../Foundation/Logo'
import Anchor from '../Foundation/Anchor'
import { P, TextWrapper } from '../Foundation/Text'
import Socials from '../Socials'
import { socials } from '../../constants/config'

const StyledFooter = styled.footer`
  min-height: ${HEIGHT.FOOTER}vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${PADDING.MAIN.SP}px;
  ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      padding: ${PADDING.MAIN.MP}px;
    }
  `}
`

const AnchorList = styled.div`
`

export default function Footer() {
  return (
    // <StyledFooter>
    //   <Logo size={100} url={mswURL} />
    //   <AnchorList lineHeight="2em">
    //     {Object.entries(links.FOOTER).map((link) => {
    //       const name = link[0].toUpperCase()
    //       const href = link[1]
    //       return (
    //         <Anchor key={link[0]} href={href} style={{ fontSize: '0.8em' }}>
    //           {name}
    //         </Anchor>
    //       )
    //     })}
    //   </AnchorList>
    //   <TextWrapper lineHeight="2em" align="center">
    //     <P fsize="0.7em">Copyright &copy; 2022 MetaGaming Guild. All Rights Reserved</P>
    //   </TextWrapper>
    //   <Socials links={socials} />
    // </StyledFooter>
    <div className="w-full flex flex-col justify-center items-center pt-[3em] pb-[1em]">
      <Logo size={169} url={mswURL} />
      <div className="py-3">
        <Socials links={socials} />
      </div>
      <div className="flex flex-col justify-center underline decoration-[#A8A8A8] text-[#A8A8A8] items-center gap-2 text-center text-[12px]">
        <a href="#" className="text-[#A8A8A8]">PRIVACY POLICY</a>
        <a href="#" className="text-[#A8A8A8]">TERMS AND CONDITION</a>
      </div>
      <div className="pt-3">
        <p className="text-[#A8A8A8] text-[12px]">&copy; Copyright 2022 MetaGaming Guild. All Rights Reserved</p>
      </div>
    </div>
  )
}
