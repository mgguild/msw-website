import React from 'react';
import { useMarketplaceV2FetchItem } from '../../../../hooks/useMarketplaceV2Data';
import { Grid } from '@mui/material';

const withGridLayout = (WrappedComponent: any) => {
    return (props: any) => {
        const [loaded, setIsLoaded] = React.useState(false);
        const { nftId } = props;
        const { selected: nft } = useMarketplaceV2FetchItem(nftId);

        React.useEffect(() => {
            if (nft) {
                setTimeout(() => setIsLoaded(true), 2000);
            }
            return () => clearTimeout(setTimeout(() => setIsLoaded(true), 2000));
        }, [nft]);

        const modifiedProps = {
            item: nft,
            ...props,
        };
        return (
            <Grid item xs={12} sm={6}>
                <WrappedComponent {...modifiedProps} />
            </Grid>
        );
    };
};

export default withGridLayout;
