import React, { useState, useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit'
import { TWOwnerResult } from '../../../../state/types';
import styled from 'styled-components';
import { useAppDispatch } from '../../../../state';
import { getOwnerNFTs } from '../../../../state/thirdweb/thirdweb';
import { useFetchOwnerNFTs } from '../../../../state/hooks';
import { Button, Flex, IconButton } from '@metagg/mgg-uikit';
import { toast } from 'react-toastify';
import Diggers from '../../../../../Data/DiggerParts';
import SvgIcon from '../../components/Foundation/SvgIcon';
import { Grid, Modal, Box } from '@mui/material';
import FBox, { MiniBox } from '../../components/Foundation/Box';
import CategoryBox from './Cat-Box';
import NftCard from './NftCard';
import SpriteDisplay from '../../components/Card/Display';
import withGridLayout from '../NFTPage/withGridLayout';
import { H1, H3, H4, P, TextWrapper } from '../../components/Foundation/Text';
import Iconloader from '../../components/Foundation/Iconloader';
import { CardContainer, BadgeContainer, CardHeader, CardText } from '../../components/Card/styled';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Web3Button } from '@thirdweb-dev/react';
import {
    useOwnedNFTs,
    useContract,
    useAddress,
    useContractWrite,
    useContractRead,
    NFT
} from '@thirdweb-dev/react';
import maticToWei from '../../../../utils/maticToWei';
import axios from 'axios';
import { CardType, CLASSES } from '../../../../contexts';
import { getBalanceAmount } from '../../../../utils/formatBalance';
import ABI from '../../constants/abi.json';
import FetchNFT from './FetchNFT';
import { getRarity, getRarityBorder, getClassName, getHashId, getName } from './utils';

const contractAddress = '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78';
const contractAddressSecond = '0x90ba9328748cf652f9bba12be0436acf4f782076';
const mdlStyle = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

interface listData {
    data?: {
        listings: any;
    };
}

export interface nftData {
    name: string;
    image: string;
    description: string;
    rarity: string;
    attributes: any;
}

const CenterFrame = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MdlContainer = styled.div`
    position: relative;
    background-color: #4f19a7;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    border: white solid 2px;
    border-radius: 10px;
    min-width: 15rem;
    width: 60rem;
    max-height: 100vh;
    padding: 1rem;
`;

const StatField = styled.div`
    display: flex;
    flex-flow: column;
    background-color: #0d123a;
    border: 2px solid #379cbf;
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
`

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > * {
        margin: 1rem 0px;
    }

    ${({ theme }) => `
    ${theme.mediaQueries.md} {
      padding: 0 1.4rem;
    }
  `}
`;

const NftCollection = (props: any) => {
    const dispatch = useAppDispatch();

    const address = useAddress();
    const { contract } = useContract(contractAddress);

    const [nftCount, setNftCount] = useState(10);
    const [nftStart, setNftStart] = useState(0);

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [oldData, setOldData] = useState<NFT | undefined>();

    const [marketplaceData, setMarketplaceData] = useState<CardType[] | []>([]);
    const [nftState, setNftState] = useState<listData | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [nftError, setError] = useState<any>(null);

    const query = `
        query {
            listings(first: 10, orderBy: id, orderDirection: desc, where:{seller_contains: "${address}"} ) {
                id
                seller
                tokenId
                price
                blockTimestamp
            }
        }
    `;

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

                setMarketplaceData(nfts);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    const OwnedNFTs = () => {

        const {data, isLoading, error} = useOwnedNFTs(contract, address, {start: (nftStart * 10), count: nftCount})
        const [MdlNFT, setMdlNFT] = useState(false);
        const [actData, setActData] = useState<nftData | undefined>()

        // TODO use redux here
        // const [data, setData] = useState<NFT[] | undefined >([]);
        // const [isLoading, setLoading] = useState(true);
        // const [error, setError] = useState();

        const hndlPrev = async () => {
            setIsFetching(true);
            setNftStart(Math.max(0, nftStart - 1));
        }

        const hndleNext = async () => {
            setIsFetching(true);
            setNftStart(nftStart + 1);
        }

        const NftMain = () => {
            return(
                <ContentWrapper>
                    <Flex justifyContent="center" alignItems="center" style={{flexFlow: 'column nowrap', textAlign: 'center', margin: '0 1rem'}}>
                        <h1>{actData?.name}</h1>
                        <p
                            className={`border-2 ${getRarityBorder(actData ? actData.rarity : 'Common')} p-2 rounded-[5px] text-[12px]`}
                            style={{maxWidth: '6rem'}}
                        >
                            {actData?.rarity}
                        </p>
                    </Flex>
                    <div>
                        <SpriteDisplay
                            {...{ spriteURL: actData ? actData.image : '' }}
                        />
                    </div>
                    <FBox style={{padding: '1rem'}} className="bg-gradient-to-b from-[#2A3169] to-[#141839]">
                        <TextWrapper align="center">
                            <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '1rem'}}>
                                <SvgIcon Img={<img alt="badge-logo" src={ Diggers[ actData?.attributes[0].value ].badgeImg} />} width={60} height={60} />
                                <H4 fsize="1.5em">{actData?.attributes[0].value}</H4>
                            </div>
                            <p style={{fontWeight: '500', textAlign: 'left', margin: '1rem 0 0 0'}}>
                                {actData?.description}
                            </p>
                        </TextWrapper>
                    </FBox>
                </ContentWrapper>
            )
        };

        const NftDetails = () => {
            const isUnique = actData ? actData.attributes[1].trait_type !== '1/1' : false;
            const digClass = actData ? actData.attributes[0].value : 'Knight'
            const digHat = actData ? actData.attributes[4].value : 'Giant King'
            const digEyes = actData ? actData.attributes[5].value : 'Seasoned Veteran'
            const digNose = actData ? actData.attributes[6].value : 'Seasoned Beard'
            const digClothes = actData ? actData.attributes[3].value : 'Light Muscle Armor'

            const skillImg = isUnique ?
                                <img alt="skill-logo" className='rounded-[20rem]' src={ `images/nfts/MSW/abilities/${Diggers[ digClass ].legendary.ability.img}` } />
                                :
                                <img alt="skill-logo" className='rounded-[20rem]' src={ `images/nfts/MSW/abilities/${Diggers[ digClass ].hats[ digHat ].ability.img}` } />
                                ;
            const eyes = Diggers[ digClass ].eyes
            const noses = Diggers[ digClass ].noses
            const clothes = Diggers[ digClass ].clothes

            const renderStats = () => (
                <>
                    <Grid container spacing={0.5} mt={0.5}>
                        {isUnique ?
                            Diggers[ digClass ].legendary.stat.map((s, ind) => {
                                const key = ind + 1;
                                return (
                                    <Grid item xs={12} sm={6} key={key}>
                                        <StatField>
                                            <div>{s.attribute}</div>
                                            <div style={{fontWeight: 1000}}>{s.modifier}</div>
                                        </StatField>
                                    </Grid>
                                );
                            })
                        :
                            Diggers[ digClass ].baseStats.map((s, ind) => {
                                const key = ind + 1;
                                return (
                                    <Grid item xs={12} sm={6} key={key}>
                                        <StatField>
                                            <div>{s.attribute}</div>
                                            <div style={{fontWeight: 1000}}>{s.modifier}</div>
                                        </StatField>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                    {isUnique &&
                        <div style={{display: 'flex', margin: '0.5rem 0 0 0', flexFlow: 'column', gap: '0.2rem'}}>
                            <h1>Modifiers</h1>
                            {eyes &&
                                <StatField>
                                    <div>{digEyes}</div>
                                    <div style={{fontWeight: 1000}}>
                                        {eyes[digEyes].stat.map((s, i) => {
                                                return(
                                                    <div key={i}>
                                                        + {s.modifier} {s.attribute}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </StatField>
                            }
                            {noses &&
                                <StatField>
                                    <div>{digNose}</div>
                                    <div style={{fontWeight: 1000}}>
                                        {noses[digNose].stat.map((s, i) => {
                                                return(
                                                    <div key={i}>
                                                        + {s.modifier} {s.attribute}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </StatField>
                            }
                            {clothes &&
                                <StatField>
                                    <div>{digClothes}</div>
                                    <div style={{fontWeight: 1000}}>
                                        {clothes[digClothes].stat.map((s, i) => {
                                                return(
                                                    <div key={i}>
                                                        + {s.modifier} {s.attribute}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </StatField>
                            }
                        </div>
                    }
                </>
            );

            const renderSkill = () => {
                return (
                    <div>
                        <MiniBox p="1em">
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', width: '100%'}}>
                                <div style={{width: '100%'}}>
                                    <SvgIcon Img={skillImg} width={80} height={80} />
                                </div>
                                <P fsize="0.8em">
                                    {isUnique ?
                                        Diggers[ digClass ].legendary.ability.description
                                    :
                                        Diggers[ digClass ].hats[ digHat ].ability.description
                                    }
                                </P>
                            </div>
                        </MiniBox>
                    </div>
                );
            };

            return (
                <ContentWrapper>
                    <Box>
                        <Flex>
                            <h1>Base Stats</h1>
                        </Flex>
                        {renderStats()}
                        <Flex style={{margin: '1rem 0 0 0'}}>
                            <h2>Ability: {isUnique ?
                                    Diggers[ digClass ].legendary.ability.name
                                :
                                    Diggers[ digClass ].hats[ digHat ].ability.name
                                }
                            </h2>
                        </Flex>
                        {renderSkill()}
                    </Box>
                </ContentWrapper>
            );
        };

        const WrappedMain = withGridLayout(NftMain);
        const WrappedDetails = withGridLayout(NftDetails);

        useEffect(() => {

            // const getNFTs = async () => {
            //     const res: PayloadAction<TWOwnerResult, string, {start: number, count: number}> = await dispatch(getOwnerNFTs({start: nftStart, count: nftCount}))


            // }

            // getNFTs();

            if(data && data[0].metadata.id !== oldData?.metadata.id)
            {
                setOldData(data[0])
                setIsFetching(false);
            }
        }, [data, isLoading, nftStart, nftCount])

        return(
        <>
            <Modal
                open={MdlNFT}
                onClose={() => setMdlNFT(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={mdlStyle}>
                    <CenterFrame>
                        <MdlContainer>
                            <button style={{position: 'absolute', right: '1rem'}} onClick={() => setMdlNFT(false)}>
                                <Iconloader type='fa' name='RegWindowClose' />
                            </button>
                            <Grid container spacing={0.3}>
                                <WrappedMain />
                                <WrappedDetails />
                            </Grid>
                        </MdlContainer>
                    </CenterFrame>
                </Box>
            </Modal>
            {isFetching ? <div style={{display:'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>Loading...</div> :
            <>
                <FetchNFT
                    data={data}
                    marketplaceData={marketplaceData}
                    start={nftStart}
                    count={nftCount}
                    setNftData={setActData}
                    setNFTModal={setMdlNFT}
                />
                <div style={{display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', alignContent: 'center'}}>
                    {/* <button onClick={() => setNftCount(nftCount + 10)}>
                        view more
                    </button> */}
                    <Button onClick={() => hndlPrev()}>
                        <FaChevronLeft />
                    </Button>
                    <h1 style={{justifyItems: 'center'}}>
                        page: {nftStart + 1}
                    </h1>
                    <Button onClick={() => hndleNext()}>
                        <FaChevronRight />
                    </Button>
                </div>
            </>
            }
        </>)
    }

    return (
        <div style={{width: '100%'}}>
            <div className="py-[2em]">
                <b className="text-[24px] text-[#ECB602] font-black">OWNED CHARACTERS / ITEMS</b>
            </div>
            <div className="flex flex-wrap justify-start items-center gap-3" style={{width: '100%'}}>
                <OwnedNFTs />
            </div>
        </div>
    )
}

export default NftCollection;

const Content = styled.div``;
