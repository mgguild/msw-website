import React, { useState } from 'react'
import styled from 'styled-components'
import { H1, TextWrapper } from '../../components/Foundation/Text'
import Filters from '../../components/Filters'
import Main from '../Main'
import Nftlist from './Nftlist'

const Market = () => {

  return (
    <div style={{ width: '100%' }}>
      <Main>
        <Filters />
        <StyledDiv>
          <TextWrapper>
            <H1 fsize="2em">LOREM IPSUM</H1>
          </TextWrapper>
          <Nftlist />
        </StyledDiv>
      </Main>
    </div>
  )
}

export default Market

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  padding: 15px 0px;
`
