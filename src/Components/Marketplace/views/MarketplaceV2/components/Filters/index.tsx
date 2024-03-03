import React, { useState } from 'react'
import styled from 'styled-components'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import useTheme from '../../../../hooks/useTheme'
import { FaChevronDown, FaFilter } from 'react-icons/fa'
import Button from '../Foundation/Button'
import { MiniBox } from '../Foundation/Box'
import { P, TextWrapper } from '../Foundation/Text'
import Filter from './Filter'
import Dropdown from '../Foundation/Dropdown'

const Filters = () => {
    const { theme } = useTheme();
    const {
        controllers: {
            drawer: { toggleDrawer },
        },
    } = useMarketplaceV2();

  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <b className="font-black text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#4ED2FB] to-[#6B3CD3]">NFT MARKET</b>
      <Container>
        <TextWrapper className="filter-actions">
          {/* <Dropdown filters={filters} /> */}
          {/* <Button m='0' onClick={toggleDrawer('right', true)} variant="text" iconType="fa" icon="Filter" title="Filters" /> */}
          <FaFilter onClick={toggleDrawer("right", true)} className="cursor-pointer w-auto h-[30px]" />
        </TextWrapper>
        <Filter />
      </Container>
    </div>
  )
}

export default Filters;

const filters = ['Recently Added', 'Low Price Order', 'Highest Price Order'];

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .filter-actions {
        display: flex;
        align-items: center;
        & > * {
            height: 30px;
        }
    }
`;
