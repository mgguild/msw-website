import { Flex } from '@metagg/mgg-uikit';
import React from 'react';
import styled from 'styled-components';
import { MiniBox } from '../../../../views/MarketplaceV2/components/Foundation/Box';
import Iconloader from '../../../../views/MarketplaceV2/components/Foundation/Iconloader';
import { P } from '../../../../views/MarketplaceV2/components/Foundation/Text';
import {
    COLORS,
    DEFAULT_BORDERS,
} from '../../../../views/MarketplaceV2/styles/constants';

const CategoryBox = (props: any) => {
    const { active, ind } = props;
    return (
        <Container activeIndex={active === ind}>
            <Wrapper flexDirection="column" alignItems="center">
                <P fsize="0.8em" mb="0.2em">
                    Digger
                </P>
                <Iconloader type="fa" name="User" style={{ fontSize: '2em' }} />
                <P fsize="0.8em">4</P>
            </Wrapper>
        </Container>
    );
};

export default CategoryBox;

const Container = styled.div<{ activeIndex?: boolean }>`
    border-radius: 10px;
    padding: 10px;
    border: ${DEFAULT_BORDERS};
    display: flex;
    color: ${({ theme }) => theme.colors.text};
    margin: 5px 0;
    font-size: 1em;
    background-color: ${COLORS.MENU};
    ${({ activeIndex, theme }) =>
        activeIndex &&
        `
      background-color: ${theme.colors.primary};
      border: none;
  `}
`;

const Wrapper = styled(Flex)``;
