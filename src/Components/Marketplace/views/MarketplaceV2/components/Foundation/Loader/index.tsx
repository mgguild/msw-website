import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@metagg/mgg-uikit'
import Section, { StyledPage } from '../layout'
import Logo from '../Logo'

const Wrapper = styled(StyledPage)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Logo size={150} />
    </Wrapper>
  )
}

export default PageLoader
