import React from 'react'
import { IconButton, Flex } from '@metagg/mgg-uikit'
import { useLocation } from 'react-router-dom'
import useTheme from '../../../../hooks/useTheme'
import useMarketplaceAuth from '../../../../hooks/useMarketplaceAuth'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import { P, TextWrapper } from '../Foundation/Text'
import { CustomBox, StyledDiv } from './styled'
import Iconloader from '../Foundation/Iconloader'
import Login from '../Foundation/Login'
import Anchor from '../Foundation/Anchor'
import './style.css'

const UserHighlight = () => {
  const { theme } = useTheme()
  const { user } = useMarketplaceAuth()
  const { controllers } = useMarketplaceV2()
  const { modal } = controllers
  const { pathname } = useLocation()
  const pageMap = pathname
    .split('/')
    .map((item) => (item === 'marketplace' ? 'home' : item))
    .reduce((accumulator: string[], currentValue) => {
      if (currentValue !== '') {
        accumulator.push(currentValue.toUpperCase())
      }
      return accumulator
    }, [])

  const renderPageMap = () => (
    <P style={{ cursor: 'default' }}>
      <Anchor href="/marketplace/nft" style={{ color: theme!.colors.textSubtle }}>
        {pageMap[0]} &gt;{' '}
      </Anchor>{' '}
      <span>{pageMap[1].replace(/[^a-zA-Z ]/g, ' ')}</span>
    </P>
  )
  return (
    <TextWrapper>
      <StyledDiv>
        {renderPageMap()}
        <div className="user-h-actions">
          {/* revert this condition */}
          {!user ? (
            <>
              <IconButton variant="text" className="icon-button" onClick={() => modal.handleOpen('buy-token')}>
                <CustomBox>
                  <P fsize="0.6em">123456789 MGG &nbsp;</P>
                  <Iconloader type="fa" name="Coins" fontSize="0.6em" className="with-animation-enlarge" />
                </CustomBox>
              </IconButton>
              <IconButton variant="text" style={{ padding: 0 }} className="icon-button">
                <CustomBox>
                  <Iconloader type="fi" name="LogOut" fontSize="0.6em" className="with-animation-enlarge" />
                </CustomBox>
              </IconButton>
            </>
          ) : (
            <CustomBox>
              <Login />
            </CustomBox>
          )}
        </div>
      </StyledDiv>
    </TextWrapper>
  )
}

export default UserHighlight
