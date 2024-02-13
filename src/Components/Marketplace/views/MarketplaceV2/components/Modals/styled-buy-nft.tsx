import React from 'react'
import styled from 'styled-components'
import { COLORS, DEFAULT_BORDERS } from 'views/MarketplaceV2/styles/constants'

export const Container = styled.div`
  background-color: transparent;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 300px;
`
export const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
  & > button {
    flex-basis: 100px;
    height: 5vh;
  }
`
