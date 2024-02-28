import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { Flex, IconButton } from '@metagg/mgg-uikit';
import { useMarketplaceV2FetchData } from '../../../../hooks/useMarketplaceV2Data';
import BasicTooltip from '../../components/Foundation/Tooltip';
import MarketPlaceButton from '../../components/Foundation/Button';
import { P, H2, TextWrapper } from '../../components/Foundation/Text';
import { MiniBox } from '../../components/Foundation/Box';
import Iconloader from '../../components/Foundation/Iconloader';
import { StyledButton } from '../../components/Foundation/Button/styled';
import { ContentWrapper, StyledBox } from './styled';
import CategoryBox from './Cat-Box';
import NftCard from './NftCard';
import { CardContainer, CardHeader, CardText } from '../../components/Card/styled';
import { Web3Button } from '@thirdweb-dev/react';
import {
    useOwnedNFTs,
    useContract,
    useAddress,
    useContractWrite,
    useContractRead,
} from '@thirdweb-dev/react';
import maticToWei from '../../../../utils/maticToWei';
import axios from 'axios';
import { CardType, CLASSES } from '../../../../contexts';
import { getBalanceAmount } from '../../../../utils/formatBalance';
import ABI from '../../constants/abi.json';

const contractAddress = '0x290ca81d1ba1a31cd78be176df08c89e63c6de91';
const contractAddressSecond = '0x3A53815FfAf6c14069c00A00D7eE94C370280e87';

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

const CategoryList = ({ active, setActive }: any) => (
    <Grid container columnGap={3} sx={{ margin: '0.5em 0px 2em 0px' }}>
        <Grid item className="with-animation-enlarge">
            <IconButton onClick={() => setActive(0)}>
                <CategoryBox active={active} ind={0} />
            </IconButton>
        </Grid>
        <Grid item className="with-animation-enlarge">
            <IconButton onClick={() => setActive(1)}>
                <CategoryBox active={active} ind={1} />
            </IconButton>
        </Grid>
    </Grid>
);

const DisplayNft = ({ data }: any) => {
    return (
        <Grid container wrap="wrap" spacing={5}>
            {data.map((d: any) => (
                <Grid item xs={12} md={6}>
                    <NftCard {...d} />
                </Grid>
            ))}
        </Grid>
    );
};

const SellModal = (props: any) => {
    const { isSelling, marketplaceData, nft, handleCloseModal, modalActive, key } = props;
    const [modalVisible, setModalVisible] = useState<boolean>(modalActive || false);

    const { contract: contractSecond } = useContract(contractAddressSecond);
    const [maticInput, setMaticInput] = useState<number>(0);
    const [weiValue, setWeiValue] = useState<number>(0);
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setMaticInput(parseFloat(value));
        const wei = maticToWei(parseFloat(value));
        setWeiValue(wei);
    };
    const {
        mutateAsync,
        isLoading: isLoadingContract,
        error: errorContract,
    } = useContractWrite(contractSecond, 'createListing');
    const {
        mutateAsync: mutateAsyncSecond,
        isLoading: isLoadingContractSecond,
        error: errorContractSecond,
    } = useContractWrite(contractSecond, 'cancelListing');
    const listingIndex = marketplaceData.findIndex(
        (item: { id: string }) => item.id === nft.metadata.id,
    );
    let listingId = -1;
    if (listingIndex !== -1) {
        // eslint-disable-next-line prefer-destructuring
        listingId = marketplaceData[listingIndex].listingId;
    }

    const address = useAddress();

    const { contract: approvalContract } = useContract(contractAddress);
    const {
        data: approvalData,
        isLoading: approvalIsLoading,
        error: approvalError,
    } = useContractRead(approvalContract, 'isApprovedForAll', [
        address,
        '0x3A53815FfAf6c14069c00A00D7eE94C370280e87',
    ]);

    const [usedContract, setUsedContract] = useState<string>(contractAddressSecond);

    useEffect(() => {
        setModalVisible(modalVisible);
        if (approvalData) {
            setUsedContract(contractAddressSecond);
        } else {
            setUsedContract(process.env.REACT_APP_MARKETPLACE_ADDRESS as string);
        }
    }, [modalVisible, modalActive, approvalData, approvalIsLoading, approvalError]);

    return (
        <>
            {modalVisible && (
                <div className={`fixed inset-0 w-full h-full bg-black/50`}>
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="relative snap-x flex flex-col justify-center items-center bg-gradient-to-b from-[#181020] to-[#2A2964] pb-[5em] w-[727px] px-[2em] pt-[2em] rounded-[20px]">
                            <div
                                className="absolute right-[-1em] top-[-1em] bg-[#181020] p-[1em] rounded-full"
                                onClick={handleCloseModal}
                            >
                                <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.324514 0.353169C0.53257 0.145372 0.814599 0.0286551 1.10865 0.0286551C1.4027 0.0286551 1.68473 0.145372 1.89279 0.353169L9.98567 8.44605L18.0786 0.353169C18.1801 0.244149 18.3026 0.156707 18.4388 0.0960597C18.5749 0.035412 18.7218 0.00280145 18.8708 0.000172691C19.0198 -0.00245607 19.1678 0.0249508 19.306 0.0807592C19.4441 0.136568 19.5696 0.219634 19.675 0.325002C19.7804 0.430371 19.8634 0.555882 19.9192 0.694051C19.975 0.832219 20.0025 0.980212 19.9998 1.1292C19.9972 1.27819 19.9646 1.42513 19.9039 1.56124C19.8433 1.69735 19.7559 1.81986 19.6468 1.92144L11.5539 10.0143L19.6468 18.1072C19.7559 18.2088 19.8433 18.3313 19.9039 18.4674C19.9646 18.6035 19.9972 18.7505 19.9998 18.8995C20.0025 19.0484 19.975 19.1964 19.9192 19.3346C19.8634 19.4728 19.7804 19.5983 19.675 19.7037C19.5696 19.809 19.4441 19.8921 19.306 19.9479C19.1678 20.0037 19.0198 20.0311 18.8708 20.0285C18.7218 20.0259 18.5749 19.9932 18.4388 19.9326C18.3026 19.8719 18.1801 19.7845 18.0786 19.6755L9.98567 11.5826L1.89279 19.6755C1.68244 19.8715 1.40422 19.9782 1.11676 19.9731C0.829286 19.9681 0.555008 19.8516 0.351705 19.6483C0.148402 19.445 0.0319474 19.1707 0.0268753 18.8832C0.0218033 18.5958 0.128509 18.3176 0.324514 18.1072L8.4174 10.0143L0.324514 1.92144C0.116717 1.71339 0 1.43136 0 1.13731C0 0.843254 0.116717 0.561225 0.324514 0.353169Z"
                                        fill="#ADADAD"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="uppercase font-bold text-[40px] text-[#C2C2C2]">
                                    MATIC
                                </p>
                            </div>
                            <div className="w-full snap-center pb-5 pt-1">
                                {isSelling ? (
                                    <div className="text-center text-[#C2C2C2] text-[30px]">
                                        <p>Are you sure you want cancel the listing?</p>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="number"
                                            min="0"
                                            value={maticInput}
                                            onChange={handleInput}
                                            className="h-50 w-full pl-[0.5em] text-[#ABABAB] text-[24px] border-2 rounded-[10px] border-[#808080] bg-transparent"
                                            placeholder="Type price in MATIC"
                                        />
                                    </>
                                )}
                            </div>
                            <div className="absolute left-0 bottom-0 w-full flex justify-center items-center">
                                {isSelling ? (
                                    <Web3Button
                                        theme="dark"
                                        className="uppercase w-100 font-bold text-[40px] rounded-b-[20px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                                        // contractAddress={contractAddress}
                                        contractAddress={usedContract}
                                        contractAbi={ABI}
                                        action={async contract => {
                                            // approve listing
                                            if (!approvalData) {
                                                await contract.erc721.setApprovalForAll(
                                                    '0x3A53815FfAf6c14069c00A00D7eE94C370280e87',
                                                    true,
                                                );
                                            } else {
                                                await contract.call('cancelListing', [
                                                    listingId,
                                                ]);
                                            }
                                            // listing id
                                            // mutateAsyncSecond({
                                            //   args: [listingId]
                                            // })
                                        }}
                                        onSuccess={res => {
                                            console.log('Listing cancelled');
                                            console.log(res);
                                            setModalVisible(false);
                                        }}
                                    >
                                        Cancel Listing
                                    </Web3Button>
                                ) : (
                                    <Web3Button
                                        theme="dark"
                                        className="uppercase w-100 font-bold text-[40px] rounded-b-[20px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                                        isDisabled={maticInput < 0 && true}
                                        contractAddress={usedContract}
                                        contractAbi={ABI}
                                        action={async contract => {
                                            // approve listing
                                            if (!approvalData) {
                                                await contract.erc721.setApprovalForAll(
                                                    '0x3A53815FfAf6c14069c00A00D7eE94C370280e87',
                                                    true,
                                                );
                                            } else {
                                                await contract.call('createListing', [
                                                    contractAddress,
                                                    nft.metadata.id,
                                                    weiValue.toString(),
                                                ]);
                                            }
                                            // contract, token id, price in wei
                                            // mutateAsync({
                                            //   args: [contractAddress, nft.metadata.id, weiValue.toString()]
                                            // })
                                        }}
                                        onSuccess={res => {
                                            console.log('Success selling');
                                            console.log(res);
                                            setModalVisible(false);
                                        }}
                                    >
                                        Sell
                                    </Web3Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

interface listData {
    data?: {
        listings: any;
    };
}

const NftCollection = (props: any) => {
    // TODO: Update to display user owned NFTs
    // const { data } = useMarketplaceV2FetchData()
    const [active, setActive] = useState(0);

    const OwnedNFTs = () => {
        const address = useAddress();
        const { contract } = useContract(contractAddress);
        const { data, isLoading, error } = useOwnedNFTs(contract, address);
        // const { data: marketplaceData } = useMarketplaceV2FetchData()
        const [modalActive, setModalActive] = useState<boolean[]>([]);

        const [marketplaceData, setMarketplaceData] = useState<CardType[] | []>([]);
        const [nftState, setNftState] = useState<listData | null | undefined>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [nftError, setError] = useState<any>(null);

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

        const handleToggleModal = (index: number) => {
            setModalActive(prevVisibility => {
                const updatedVisibility = [...prevVisibility];
                updatedVisibility[index] = !updatedVisibility[index];
                return updatedVisibility;
            });
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
                return data.attributes.find((attr: any) => attr.trait_type === '1/1')
                    .value;
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

                    setMarketplaceData(nfts);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchData();
        }, [marketplaceData, query]);

        return (
            <>
                {!isLoading &&
                    data?.map((nft, key) => {
                        const isSelling = marketplaceData.find(
                            (item: { id: string }) => item.id === nft.metadata.id,
                        );

                        return (
                            <div key={key}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Grid container spacing={{ xs: 2, sm: 4 }} pt={5}>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            md={3}
                                            lg={3}
                                            xl={3}
                                            justifyContent="center"
                                        >
                                            <StyledFlex>
                                                <CardContainer className="secondary-drop-shadow">
                                                    <CardHeader>
                                                        <CardText>
                                                            {nft.metadata.name}
                                                        </CardText>
                                                    </CardHeader>
                                                    <img
                                                        src={nft.metadata.image as string}
                                                        alt="Digger"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            handleToggleModal(key)
                                                        }
                                                        className="uppercase w-100 font-bold text-[24px] py-3 rounded-b-[5px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                                                    >
                                                        {isSelling
                                                            ? 'Cancel Listing'
                                                            : 'Sell'}
                                                    </button>
                                                    {modalActive[key] && (
                                                        <SellModal
                                                            key={key}
                                                            modalActive={modalActive[key]}
                                                            nft={nft}
                                                            isSelling={isSelling}
                                                            marketplaceData={
                                                                marketplaceData
                                                            }
                                                            handleCloseModal={() =>
                                                                handleToggleModal(key)
                                                            }
                                                        />
                                                    )}
                                                </CardContainer>
                                            </StyledFlex>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        );
                    })}
                {error && <p>Something went wrong</p>}
            </>
        );
    };
    return (
        <ContentWrapper>
            <StyledBox p="1em">
                <Flex alignItems="center" justifyContent="space-between">
                    <H2 fsize="1.2em">OWNED CHARACTERS/ITEMS</H2>
                    <Flex justifyContent="space-between" alignItems="center" flex="0.2">
                        <BasicTooltip title="Owned Characters or Items">
                            <MiniBox>
                                <Iconloader type="fa" name="InfoCircle" fontSize="1em" />
                            </MiniBox>
                        </BasicTooltip>

                        <MarketPlaceButton
                            variant="text"
                            title="Item List"
                            style={{ justifyContent: 'center' }}
                            height="50%"
                        />
                    </Flex>
                </Flex>

                <Content>
                    <CategoryList {...{ active, setActive }} />
                    {/* <DisplayNft data={data} /> */}
                    <OwnedNFTs />
                </Content>
            </StyledBox>
        </ContentWrapper>
    );
};

export default NftCollection;

const Content = styled.div``;
