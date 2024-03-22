import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { COLORS, DEFAULT_BORDERS } from '../../styles/constants';
import SpriteDisplay from '../../components/Card/Display';
import Header from '../../components/Card/Header';
import { NftProps } from './index.d';

const NftCard = (props: NftProps) => {
    const { name, spriteName, rarity, price, badge } = props;
    const navigate = useNavigate();
    const handleNav = (event: any) => {
        event.preventDefault();
        navigate(`/marketplace/${badge}/${name}`);
    };

    return (
        <Container className="secondary-drop-shadow" onClick={handleNav}>
            <Header {...{ name, rarity, badge }} />
            <SpriteDisplay {...{ spriteURL: 'asdfsdfds' }} />
        </Container>
    );
};

export default NftCard;

const Container = styled.div`
    border: ${DEFAULT_BORDERS};
    border-radius: 10px;
    padding: 0.5em 0px 2em 0px;
    cursor: pointer;
    outline: solid 0px ${COLORS.BORDER};
    transition: outline 0.1s ease;
    &:hover {
        outline-width: 5px;
    }
`;
