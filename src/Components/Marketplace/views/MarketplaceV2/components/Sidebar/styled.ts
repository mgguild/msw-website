import styled from 'styled-components'
import { COLORS, SETTINGS_SIDEBAR, breakpointMap } from '../../styles/constants'
import { CONTAINER_PROPS } from '../Foundation/layout'


export const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
  width: ${SETTINGS_SIDEBAR.size.width}px;
  background-color: ${COLORS.NAV};
  background: ${COLORS.GRADIENT_NAV};
  padding: 10px;
  z-index: 0;
`

export const StyledPanelBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledPanelFooter = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
`
export const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  background-color: ${COLORS.INNER};
  background: ${COLORS.GRADIENT_INNER};
`

export const Inner = styled.div`
  flex-grow: 1;
  padding: 10px;
  ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      padding: 24px;
    }
    ${theme.mediaQueries.lg}{
      ${CONTAINER_PROPS}
    }

  `}
`

