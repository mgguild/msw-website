import React from 'react'
import styled from 'styled-components'
import { useMarketplaceV2FetchData } from '../../../../hooks/useMarketplaceV2Data'
import { sectionProp } from '../Foundation/layout'
import Cards from './Cards'
import { H1, TextWrapper } from '../Foundation/Text'

export default function Featured() {
  const { data } = useMarketplaceV2FetchData()

  return (
    <Container>
      <Board className="main-drop-shadow" data-aos="slide-right">
        <TextWrapper>
          <H1 fsize="1.5em">LOREM IPSUM</H1>
          <div
            className="uppercase w-100 font-bold text-[24px] text-white text-center py-3 rounded-b-[5px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
          >
            <a href="/#/NFTMarket"
              className="text-white"
            >Visit NFT Market
            </a>
          </div>
        </TextWrapper>
        <Cards items={data} />
      </Board>
    </Container>
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
