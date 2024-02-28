import React from 'react';
import { Flex } from '@metagg/mgg-uikit';
import { Grid } from '@mui/material';
import { QueryType, useQueryAsset } from '../../../../hooks/useMarketplaceV2';
import { GoogleDriveLink } from '../../../../views/MarketplaceV2/constants/config';
import { OptionBox } from '../Foundation/Box';
import SvgIcon from '../Foundation/SvgIcon';
import { P, TextWrapper } from '../Foundation/Text';

const Option = ({ name, ...props }: { name: string }) => {
    const badgeId = useQueryAsset({ name, type: QueryType.BADGES });
    const src = GoogleDriveLink + badgeId;
    const Img = <img alt="logo" src={src} />;

    return (
        <OptionBox {...props}>
            <TextWrapper p="0.1em">
                <Flex alignItems="center">
                    <SvgIcon Img={Img} width={25} height={25} />
                    <P fsize="0.7em" ml="0.3em">
                        {name}
                    </P>
                </Flex>
            </TextWrapper>
        </OptionBox>
    );
};

export default Option;
