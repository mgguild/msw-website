import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import useMarketplaceV2 from 'hooks/useMarketplaceV2'
import { HEIGHT, PADDING } from 'views/MarketplaceV2/styles/constants'
import { mswURL } from 'views/MarketplaceV2/constants/config'
import Logo from '../Foundation/Logo'
import Anchor from '../Foundation/Anchor'
import { useAppDispatch } from '../../../../state'
import { usePlayfabUser } from '../../../../state/hooks'
import { fetchPlayfabUser, registerUser } from '../../../../state/playfab'
import { PlayfabState, PlayfabLoginResult } from '../../../../state/types'

const Navbar = () => {
  const { controllers } = useMarketplaceV2()
  const { theme } = useTheme()
  const { modal } = controllers
  const dispatch = useAppDispatch()

  const HandleSignIn = async () => {
    console.log('attempt sign in')
    // // Test login on dummy account
    // const user = await dispatch(fetchPlayfabUser({ login: 'tester17', password: '123123' }))

    // console.log('Playfab User:')
    // console.log(user.payload)
  }

  const HandleSignUp = async () => {
    console.log('attempt sign up')
    // // Test register
    // const register = await dispatch(
    //   registerUser({ email: 'tester23@email.com', username: 'tester23', password: '123123' }),
    // )

    // console.log('Register User:')
    // console.log(register.payload)
  }

  return (
    <StyledNav>
      <Logo size={60} url={mswURL} />
      <StyledBtn onClick={() => HandleSignIn()}>Sign in</StyledBtn>
      <StyledBtn onClick={() => HandleSignUp()}>Register</StyledBtn>
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
