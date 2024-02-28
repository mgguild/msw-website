import React, { useState } from 'react';
import styled from 'styled-components';
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2';
import useTheme from '../../../../hooks/useTheme';
import { FaChevronDown } from 'react-icons/fa';
import Button from '../Foundation/Button';
import { MiniBox } from '../Foundation/Box';
import { P, TextWrapper } from '../Foundation/Text';
import Filter from './Filter';
import Dropdown from '../Foundation/Dropdown';

const Filters = () => {
    const { theme } = useTheme();
    const {
        controllers: {
            drawer: { toggleDrawer },
        },
    } = useMarketplaceV2();

    return (
        <Container>
            <TextWrapper className="filter-actions">
                <Dropdown filters={filters} />
                <Button
                    m="0"
                    onClick={toggleDrawer('right', true)}
                    variant="text"
                    iconType="fa"
                    icon="Filter"
                    title="Filters"
                />
            </TextWrapper>
            <Filter />
        </Container>
    );
};

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
