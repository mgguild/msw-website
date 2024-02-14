import React from 'react'
import styled from 'styled-components'
import { COLORS, DEFAULT_BORDERS } from 'views/MarketplaceV2/styles/constants'
import { TextWrapper } from '../Foundation/Text'
import { backgroundProp } from '../Foundation/layout'
import { DefaultButton } from '../Foundation/Button/styled'

export const CardContainer = styled.div`
  cursor: pointer;
  background-color: ${COLORS.CARD};
  background: ${COLORS.GRADIENT_CARD};
  border: ${DEFAULT_BORDERS};
  outline: solid 0px ${COLORS.BORDER};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ theme }) => `
    ${theme.mediaQueries.xl} {
      max-width: 100%;
      margin: 0.5em;
    }
  `}

  transition: outline 0.1s ease;
  &:hover {
    outline-width: 5px;
  }

`
const commonSectionStyle = (props?: { justify?: string; align?: string; padding?: string }) => {
  return `
  display: flex;
  align-items: ${props.align};
  justify-content: ${props.justify};
  ${
    props.padding &&
    `
    padding: ${props.padding};
  `
  }

`
}

const PADDING = '10px'
export const CardHeader = styled.header`
  ${commonSectionStyle({ justify: 'space-between', align: 'center', padding: PADDING })}
`

export const CardText = styled(TextWrapper)`
  margin-right: 5px;
  line-height: 1.2em;
`

export const Display = styled(backgroundProp)<{ bg?: string }>`
  ${commonSectionStyle({ justify: 'center', align: 'center' })}
  flex: 3;
  border: 4px solid ${COLORS.BORDER};
  position: relative;
  border-radius: 10px;
  & img {
    margin: 0 auto;
    z-index: 1;
  }
  :before {
    opacity: 0.2;
  }
`

export const Details = styled.div`
  ${commonSectionStyle({ padding: PADDING, justify: 'space-between', align: 'center' })}
  flex: 1;
  z-index: 2;
`

export const Button = styled(DefaultButton)`
  border-radius: 5px;
  width: 30%;
`
