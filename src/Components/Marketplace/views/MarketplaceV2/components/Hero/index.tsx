import React from 'react';
import styled from 'styled-components';
import { useFetchImg } from '../../../../utils/assetFetch';
import { MARGIN, PADDING } from '../../styles/constants';
import { backgroundProp, sectionProp } from '../Foundation/layout';

const Container = styled(backgroundProp)<{ bg?: string }>`
    background-color: transparent;
    display: flex;
    ${sectionProp}
    :before {
        opacity: 0.1;
    }
`;

const BannerHolder = styled(backgroundProp)<{ bg?: string }>`
    border-radius: 5px;
    margin: ${MARGIN.SM}px;
    position: relative;
    flex: 1;
    :before {
        opacity: 0.5;
        border-radius: 5px;
    }

    ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      flex: 0.8;
      margin: ${MARGIN.SM}px auto;
    }
  `}
`;

export default function Hero() {
    // const bannerSrc = { name: 'Banner', folder: 'banner' }
    const bannerSrc = { name: 'banner_placeholder', folder: 'banner', extension: 'jpg' };
    const image = useFetchImg(bannerSrc);

    return (
        // <Container bg={image} data-aos="fade-in">
        //   <BannerHolder bg={image} />
        // </Container>
        <div className="h-50">
            <img src={image} alt="MetaSaga Warriors banner" />
        </div>
    );
}
