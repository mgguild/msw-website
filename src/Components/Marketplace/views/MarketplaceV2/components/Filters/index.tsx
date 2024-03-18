import React, { useState } from 'react'
import styled from 'styled-components'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import useTheme from '../../../../hooks/useTheme'
import { FaChevronDown, FaFilter } from 'react-icons/fa'
import Button from '../Foundation/Button'
import { MiniBox } from '../Foundation/Box'
import { P, TextWrapper } from '../Foundation/Text'
import Filter from './Filter'
import useFilter from '../../../../hooks/useFilter';
// import Dropdown from '../Foundation/Dropdown'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Filters = () => {
  const { theme } = useTheme();
  const {
      controllers: {
          drawer: { toggleDrawer },
      },
  } = useMarketplaceV2();
  const [filterBy, setFilterBy] = useState('Price')
  const [orderBy, setOrderBy] = useState('Desc')

  const setFilter = useFilter((state: any) => state.setFilter)
  const setOrder = useFilter((state: any) => state.setOrder)

  const handleFilter = (filter: string) => {
    setFilterBy(filter)

    switch (filter) {
      case 'Name':
        setFilter('tokenId');
        break;

      case 'Price':
        setFilter('price');
        break;

      default:
        break;
    }
  }

  const handleOrder = (filter: string) => {
    setOrderBy(filter)

    switch (filter) {
      case 'Asc':
        setOrder('asc');
        break;

      case 'Desc':
        setOrder('desc');
        break;

      default:
        break;
    }
  }

  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <b className="font-black text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#4ED2FB] to-[#6B3CD3]">NFT MARKET</b>
      <Container>
        <TextWrapper className="filter-actions">
          {/* <Button m='0' onClick={toggleDrawer('right', true)} variant="text" iconType="fa" icon="Filter" title="Filters" /> */}
          {/* <FaFilter onClick={toggleDrawer("right", true)} className="cursor-pointer w-auto h-[30px]" /> */}
          Sort by:
        </TextWrapper>
        <DropdownButton id="dropdown-marketplace-filter" title={filterBy}>
          <Dropdown.Item onClick={() => handleFilter('Name')}>
            Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilter('Price')}>
            Price
          </Dropdown.Item>
        </DropdownButton>
        <TextWrapper className="filter-actions">
          Order By:
        </TextWrapper>
        <DropdownButton id="dropdown-marketplace-filter" title={orderBy}>
          <Dropdown.Item onClick={() => handleOrder('Asc')}>
            Ascending
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOrder('Desc')}>
            Descending
          </Dropdown.Item>
        </DropdownButton>
        {/* <Filter /> */}
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
