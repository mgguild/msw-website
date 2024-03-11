import React from 'react';
import { Flex } from '@metagg/mgg-uikit';
import { GoogleDriveLink } from '../../../../views/MarketplaceV2/constants/config';
import { Display } from './styled';
import SvgIcon from '../Foundation/SvgIcon';
import testImg from '../../../../../../Assets/img/diggers/Altillery.png';

type Props = {
    spriteURL: string;
    width?: number;
    height?: number;
    style?: any;
    hideBg?: boolean;
};

const SpriteDisplay = ({ spriteURL, width, height, style, hideBg }: Props) => {
    const w = width ?? 130;
    const h = height ?? 130;
    const Img = <img alt="logo" style={{width: '100%', height: '100%',maxWidth: '500px'}} className='rounded-[20px]' src={spriteURL} />;
    return (
        <Flex alignItems="center" justifyContent="center" style={style}>
            <SvgIcon Img={Img} width={w} height={h} />
        </Flex>
    );
};

export default SpriteDisplay;

SpriteDisplay.defaultProps = {
    width: 130,
    height: 130,
    style: {},
    hideBg: false,
};
