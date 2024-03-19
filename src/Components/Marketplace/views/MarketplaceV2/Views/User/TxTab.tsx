import { Button } from '@metagg/mgg-uikit';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MiniBox } from '../../components/Foundation/Box';
import { COLORS, DEFAULT_BORDERS } from '../../styles/constants';

const TxTab = ({
    tabController,
}: {
    tabController: {
        active: number;
        setActive: React.Dispatch<React.SetStateAction<any[]>>;
    };
}) => {
    const handleChange = (newValue: any) => {
        tabController.setActive(newValue);
    };
    return (
        <div style={{ marginTop: '0.5em' }}>
            <Tabbutton
                activeIndex={tabController.active === 0}
                onClick={() => handleChange(0)}
                variant="text"
            >
                COIN
            </Tabbutton>
            <Tabbutton
                activeIndex={tabController.active === 1}
                onClick={() => handleChange(1)}
                variant="text"
            >
                NFT
            </Tabbutton>
        </div>
    );
};

export default TxTab;

const Tabbutton = styled(Button)<{ activeIndex?: boolean }>`
    color: white;
    border: ${DEFAULT_BORDERS};
    background-color: ${({ activeIndex }) => (activeIndex ? COLORS.MENU : 'transparent')};
    height: 25px;
    font-size: 0.8em;

    ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      height: 50px;
    }
  `}
`;
