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

const ShowcaseWrapper = styled.div`
@-webkit-keyframes bg-scrolling-reverse {
  100% {
    background-position: 91px 91px;
  }
}
@-moz-keyframes bg-scrolling-reverse {
  100% {
    background-position: 91px 91px;
  }
}
@-o-keyframes bg-scrolling-reverse {
  100% {
    background-position: 91px 91px;
  }
}
@keyframes bg-scrolling-reverse {
  100% {
    background-position: 91px 91px;
  }
}
@-webkit-keyframes bg-scrolling {
  0% {
    background-position: 91px 91px;
  }
}
@-moz-keyframes bg-scrolling {
  0% {
    background-position: 91px 91px;
  }
}
@-o-keyframes bg-scrolling {
  0% {
    background-position: 91px 91px;
  }
}
@keyframes bg-scrolling {
  0% {
    background-position: 91px 91px;
  }
}
  height: 100%;
  color: #C7C6C6;
  text-align: center;
  background: url("data:image/png;base64,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") repeat 0 0;
  -webkit-animation: bg-scrolling 5s infinite;
  /* Safari 4+ */
  -moz-animation: bg-scrolling 5s infinite;
  /* Fx 5+ */
  -o-animation: bg-scrolling 5s infinite;
  /* Opera 12+ */
  animation: bg-scrolling 5s infinite;
  /* IE 10+ */
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  -o-animation-timing-function: linear;
  animation-timing-function: linear;
`

export default function Showcase() {
  const bannerSrc = { name: 'showcase', folder: 'placeholder', extension: 'jpg' }
  const image = useFetchImg(bannerSrc)

  return (
    <ShowcaseWrapper className="h-auto bg-[#2A2964]">
      <div className="py-[4em]">
        <div className="flex justify-center items-stretched text-center">
          <img src={image} alt="Placeholder thumbnail" className="rounded-l-[20px]" />
          <div className="bg-[#131737] rounded-r-[20px] flex justify-center items-center flex-col">
            <a href="#" className="text-[#ECB602] font-black text-[48px] px-5">BUY NOW</a>
            <p>Until x/x lorem ipsum</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          <p className="w-25">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas odit maiores repellat dolore debitis deleniti reiciendis maxime in ipsam assumenda!</p>
        </div>
      </div>
    </ShowcaseWrapper>
  )
}
