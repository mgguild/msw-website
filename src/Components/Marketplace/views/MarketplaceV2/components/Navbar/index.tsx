import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import useTheme from '../../../../hooks/useTheme'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import { HEIGHT, PADDING } from '../../styles/constants'
import { mswURL } from '../../constants/config'
import Logo from '../Foundation/Logo'
import Anchor from '../Foundation/Anchor'
import { useAppDispatch } from '../../../../state'


const Navbar = () => {
  const { controllers } = useMarketplaceV2()
  const { theme } = useTheme()
  const { modal } = controllers
  const dispatch = useAppDispatch()

  return (
    <StyledNav>
      <Logo size={60} url={mswURL} />
      <StyledBtn>Sign in</StyledBtn>
      <StyledBtn>Register</StyledBtn>
    </StyledNav>
  )
}

export default Navbar

const StyledNav = styled.nav`
  height: ${HEIGHT.MENU}vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${PADDING.MAIN.SP}px;
  ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      justify-content: space-between;
      padding: ${PADDING.MAIN.MP}px;
    }

    ${theme.mediaQueries.md}{
      padding: 0 ${PADDING.MAIN.LG}px 0 ${PADDING.MAIN.LG}px;
    }
  `}
`

const StyledBtn = styled.button``
