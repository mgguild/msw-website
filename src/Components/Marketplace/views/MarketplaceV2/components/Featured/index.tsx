import React from 'react'
import styled from 'styled-components'
import { useMarketplaceV2FetchData } from '../../../../hooks/useMarketplaceV2Data'
import { sectionProp } from '../Foundation/layout'
import Cards from './Cards'
import { H1, TextWrapper } from '../Foundation/Text'

export default function Featured() {
  const { data } = useMarketplaceV2FetchData()
  const item = data.sort(() => Math.random() - 0.5).slice(0, 4)

  return (
    <div className="w-full h-auto bg-gradient-to-b from-[#2A2964] to-[#181020] py-[5em]">
      <div className="flex justify-center text-center items-center">
        <b className="text-[64px] bg-gradient-to-b from-[#4ED2FB] to-[#6B3CD3] bg-clip-text text-transparent font-black">LOREM IPSUM</b>
      </div>
      <div className="flex justify-center text-center items-center font-black pb-[5em]">
        <a href="/#/NFTMarket" className="font-black text-[48px] text-[#ECAF02] underline">VIEW MORE</a>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <Cards items={item} />
      </div>
    </div>
    // <Container>
    //   <Board className="main-drop-shadow" data-aos="slide-right">
    //     <TextWrapper>
    //       <H1 fsize="1.5em">LOREM IPSUM</H1>
    //       <div
    //         className="uppercase w-100 font-bold text-[24px] text-white text-center py-3 rounded-b-[5px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
    //       >
    //         <a href="/#/NFTMarket"
    //           className="text-white"
    //         >Visit NFT Market
    //         </a>
    //       </div>
    //     </TextWrapper>
    //     <Cards items={item} />
    //   </Board>
    // </Container>
  )
}

const Container = styled.div`
  ${sectionProp}
  background-color: transparent;
  display: flex;
  align-items: center;
  position: relative;
  min-height: inherit;
`

const Board = styled.div`
  flex: 1;
  padding: 25px;
  margin: 25px;
  display: flex;
  flex-direction: column;
  width: 250px;
  background: #e786fb;
  background: linear-gradient(0deg, #e786fb, #30346e);
  & > * {
    flex: 1;
  }
`
