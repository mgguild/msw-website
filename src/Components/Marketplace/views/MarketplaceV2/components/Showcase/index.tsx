import React from 'react'
import styled from 'styled-components'
import { useFetchImg } from '../../../../utils/assetFetch'
import { SCREEN_SIZE } from '../../styles/constants'
import Box from './Box'
import { backgroundProp, sectionProp } from '../Foundation/layout'
import { P, TextWrapper } from '../Foundation/Text'

const Container = styled(backgroundProp)<{ bg?: string }>`
  ${sectionProp}
  z-index: 0;
  :before {
    opacity: 0.1;
  }
`

const Holder = styled.div`
  position: absolute;
  z-index: 1;
  width: 80vw;
  min-height: 15vh;
  top: 50%; /* Move the box 50% from the top of the container */
  left: 50%; /* Move the box 50% from the left of the container */
  transform: translate(-50%, -50%);

  ${({ theme }) => `
  ${theme.mediaQueries.sm} {
    width: 40vw;
  }
`}
`

export default function Showcase() {
  const backgroundSrc = { name: 'Promotional Art', folder: 'background' }
  const image = useFetchImg(backgroundSrc)

  const renderBox = () => {
    const src = { name: 'Promotional Art', folder: 'background' }
    return <Box {...{ src }} />
  }

  return (
    <Container bg={image}>
      <Holder>
        {renderBox()}
        <TextWrapper align="center" data-aos="fade-in">
          <P fsize="0.8em">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolor recusandae consequatur natus
            voluptatem laborum quam, excepturi nisi quo optio odio, vitae ut ducimus, rem error soluta vero. Alias,
            deserunt?
          </P>
        </TextWrapper>
      </Holder>
    </Container>
  )
}
