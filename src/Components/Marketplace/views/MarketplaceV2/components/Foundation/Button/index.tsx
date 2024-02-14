import React from 'react'
import { Button } from '@metagg/mgg-uikit'
import { Props } from './index.d'
import Iconloader from '../Iconloader'
import { StyledButton, StyledMiniBox } from './styled'
import { P, TextWrapper } from '../Text'

const MarketPlaceButton = (props: Props) => {
  const { title, iconType, icon, style, children, className, variant, onClick, p, m, height } = props
  return (
    <StyledButton {...{ className, variant, onClick, p, m, height }}>
      <StyledMiniBox style={style}>
        {children ?? (
          <TextWrapper className="with-animation-enlarge">
            <P fsize="0.7em">
              {icon && <Iconloader type={iconType as string} name={icon} />}
              {title}
            </P>
          </TextWrapper>
        )}
      </StyledMiniBox>
    </StyledButton>
  )
}

export default MarketPlaceButton
