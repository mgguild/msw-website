import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { Flex } from '@metagg/mgg-uikit';
import { useMarketplaceV2FetchData } from '../../../../hooks/useMarketplaceV2Data';
import Card from '../../components/Card';
import axios from 'axios';
import { getBalanceAmount } from '../../../../utils/formatBalance';
import { CardType, CLASSES } from '../../../../contexts';

interface listData {
    data?: {
        listings: any;
    };
}

const Nftlist = () => {
    const [data, setData] = React.useState<CardType[] | []>([]);
    const [classesState, setClassesState] = React.useState<any[]>([]);

    const [nftState, setNftState] = useState<listData | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    // const { data } = useMarketplaceV2FetchData()
    const [toDisplay, setToDisplay] = React.useState<number>(10);

    const query = `
    query {
      listings(first: 10, orderBy: id, orderDirection: desc) {
        id
        seller
        tokenId
        price
        blockTimestamp
      }
    }
  `;

    const handleDisplay = () => {
        if (toDisplay !== data.length) {
            setToDisplay(toDisplay + 3);
        }
    };

    const getRarity = (attributes: any[]) => {
        if (attributes.find(attr => attr.trait_type === '1/1')) {
            return 'Legendary';
        }

        switch (attributes.find(attr => attr.trait_type === 'Class').value) {
            case 'Archer':
                return 'Common';
            case 'Artillery':
                return 'Rare';
            case 'Berserker':
                return 'Uncommon';
            case 'Dark Knight':
                return 'Epic';
            case 'Elemental':
                return 'Rare';
            case 'Engineer':
                return 'Uncommon';
            case 'Knight':
                return 'Common';
            case 'Magitek':
                return 'Epic';
            case 'Musketeer':
                return 'Common';
            case 'Plague Doctor':
                return 'Uncommon';
            case 'Vicar':
                return 'Uncommon';
            case 'Wizard':
                return 'Common';
            default:
                return 'Unknown';
        }
    };

    const getHashId = (str: string): string => {
        const parts = str.split('#');
        return parts.length > 1 ? parts[1] : '';
    };

    const getName = (data: any) => {
        if (data.attributes.find((attr: any) => attr.trait_type === '1/1')) {
            return data.attributes.find((attr: any) => attr.trait_type === '1/1').value;
        }

        return data.name;
    };

    const getClassName = (data: any) => {
        return data.attributes.find((attr: any) => attr.trait_type === 'Class').value;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = process.env.REACT_APP_SUBGRAPH_URL
                    ? process.env.REACT_APP_SUBGRAPH_URL
                    : 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange';
                const response = await axios.post(url, { query });

                for (let i = 0; i < response.data.data.listings.length; i++) {
                    const details = await axios.get(
                        `${process.env.REACT_APP_MSW_API}/api/warrior/${response.data.data.listings[i].tokenId}`,
                    );
                    response.data.data.listings[i] = {
                        ...response.data.data.listings[i],
                        ...details.data,
                    };
                }

                setNftState(response.data);
                setLoading(false);

                // --------
                const nfts = [];
                const listings = response.data?.data?.listings;
                for (let i = 0; i < listings.length; i++) {
                    nfts.push({
                        id: getHashId(listings[i].name),
                        listingId: listings[i].id,
                        name: getName(listings[i]),
                        spriteName: listings[i].image,
                        rarity: getRarity(listings[i].attributes),
                        badge: getClassName(listings[i]),
                        price: {
                            raw: listings[i].price,
                            token: `${getBalanceAmount(listings[i].price)} MATIC`,
                            fiat: 'Not Available',
                        },
                    });
                }

                setData(nfts);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [nftState, query]);

  return (
    <div className="flex flex-col justify-center items-center">
        {/* <Grid container spacing={{ xs: 2, sm: 4 }} {...settings} pt={5}>
          {data.slice(0, toDisplay).map((d: any) => (
            <Grid key={d.name} item xs={12} sm={4} md={3} lg={3} xl={3} justifyContent="center">
              <StyledFlex>
                <Card {...d} />
              </StyledFlex>
            </Grid>
          ))}
        </Grid> */}
        <div className="flex flex-wrap justify-start items-center gap-3 w-full">
        {data.slice(0, toDisplay).map((data: any) => (
          <Card {...data} />
        ))}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          {toDisplay <= data.length && (
            <button onClick={handleDisplay} type="button">
              view more
            </button>
          )}
      </div>
    </div>
  )
}

export default Nftlist;

const settings = {
    justifyContent: 'flex-start',
    alignItems: 'center',
};

const StyledFlex = styled(Flex)`
    max-width: 250px;
    // padding: 5px 10px;
    margin: 0 auto;
    ${({ theme }) => `
    ${theme.mediaQueries.xl} {
      max-width: 100%;
    }
  `}
`;
