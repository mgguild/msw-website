import { Button, IconButton } from '@metagg/mgg-uikit'
import styled from 'styled-components'

export const StyledButton = styled(Button)<{ bg?: string }>`
  width: 100%;
  height: 6vh;
  margin: 5px 0;
  border: 1px solid ${({ theme }) => theme.colors.text};
  ${(props) =>
    props.bg &&
    `
    background-color: ${props.bg};
  `}
`

export const Close = styled(IconButton)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.MGG_accent2};
`

export const Box = styled.div`
  max-width: 300px;
  margin: 5px 0;
  padding: 5px;
`
