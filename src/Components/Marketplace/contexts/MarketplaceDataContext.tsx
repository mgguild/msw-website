import React, { createContext, useEffect } from 'react';
import { CardType, CLASSES } from './index.d';
import useSubgraphQuery from '../hooks/useSubgraph';
import { getBalanceAmount } from '../utils/formatBalance';
import useFilter from '../hooks/useFilter';

export const raritySwitch = (trait: any) => {
    switch (trait) {
        case '1/1':
            return 'Legendary';
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
}

export const getRarity = (attributes: any[]) => {
    if (attributes.find(attr => attr.trait_type === '1/1')) {
        return raritySwitch('1/1');
    } else {
        return raritySwitch(attributes[0].value);
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

const getSpriteName = (data: any) => {
    if (data.attributes.find((attr: any) => attr.trait_type === '1/1')) {
        return data.attributes.find((attr: any) => attr.trait_type === '1/1').value;
    }

    return getHashId(data.name);
};

const getClassName = (data: any) => {
    return data.attributes.find((attr: any) => attr.trait_type === 'Class').value;
};

export const MarketplaceV2DataContext = createContext<any>(null);
export const MarketplaceV2DataProvider = ({ children }: any) => {
    const [nftsState, setNftsState] = React.useState<CardType[] | []>([]);
    const [classesState, setClassesState] = React.useState<any[]>([]);

    const filter = useFilter((state: any) => state.filter);
    const order = useFilter((state: any) => state.order);

    const { data, loading, error } = useSubgraphQuery(`
        query {
            listings(first: 10, orderBy: ${filter}, orderDirection: ${order}) {
                id
                seller
                tokenId
                price
                blockTimestamp
            }
        }
  `);

    useEffect(() => {
        if (!loading && !error) {
            const nfts = [];
            const listings = data?.data?.listings;
            for (let i = 0; i < listings.length; i++) {
                nfts.push({
                    id: getHashId(listings[i].name),
                    listingId: listings[i].id,
                    seller: listings[i].seller,
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

            setNftsState(nfts);
        }
    }, [data, loading, error, filter, order]);

    useEffect(() => {
        setClassesState(classes);
    }, []);

    return (
        <MarketplaceV2DataContext.Provider
            value={{
                data: {
                    nfts: nftsState,
                    classes: classesState,
                },
            }}
        >
            {children}
        </MarketplaceV2DataContext.Provider>
    );
};

const classes = [
    'Archer',
    'Artillery',
    'Berserker',
    'Dark Knight',
    'Elemental',
    'Engineer',
    'Knight',
    'Magitek',
    'Musketeer',
    'Plague Doctor',
    'Vicar',
    'Wizard',
];
