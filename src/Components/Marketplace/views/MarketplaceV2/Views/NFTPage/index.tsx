import React, {useEffect, useState} from 'react';
import {
    useAddress,
    useContract,
    useContractRead,
} from '@thirdweb-dev/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import { Button, Flex } from '@metagg/mgg-uikit';
import { GoogleDriveLink } from '../../../../views/MarketplaceV2/constants/config';
import PurchaseNFT from '../../../../views/MarketplaceV2/components/Modals/Buy-nft';
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2';
import Field from '../../../../views/MarketplaceV2/components/Foundation/Field';
import SvgIcon from '../../../../views/MarketplaceV2/components/Foundation/SvgIcon';
import {
    H3,
    H4,
    P,
    TextWrapper,
} from '../../../../views/MarketplaceV2/components/Foundation/Text';
import { toast } from 'react-toastify';
import SpriteDisplay from '../../../../views/MarketplaceV2/components/Card/Display';
import Main from '../Main';
import Box, { MiniBox } from '../../components/Foundation/Box';
import { ContentWrapper } from './styled';
import withGridLayout from './withGridLayout';
import Diggers from '../../../../../Data/DiggerParts';
import { useGetDiggerData} from '../../../../hooks/useSubgraph';
import { getBalanceAmount } from '../../../../utils/formatBalance';
import { useFetchImg } from '../../../../utils/assetFetch';
import ABI from '../../constants/abi.json';
import { Web3Button } from '@thirdweb-dev/react';
import { MdlWarn } from '../../../../../Modals'
import Iconloader from '../../components/Foundation/Iconloader';

const StatField = styled.div`
    display: flex;
    flex-flow: column;
    background-color: #0d123a;
    border: 2px solid #379cbf;
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
`

const contractAddress = '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78';
const contractAddressSecond = '0x90ba9328748cf652f9bba12be0436acf4f782076';

const NftPage: React.FC = () => {
    const params = useParams();

    const {data, loading, error} = useGetDiggerData(`${params.id}`, `${params.lid}`);
    const [rarityBorder, setRarityBorder] = useState<string>('');
    const [usedContract, setUsedContract] = useState<string>(contractAddressSecond);

    const isUnique = data ? data?.rarity !== 'Legendary' : false;
    const digClass = data ? data.class : 'Knight'
    const digHat = data ? data.parts.hat : 'Giant King'

    const src = { name: 'polygon-matic-logo', folder: 'logo' };
    const tokenImage = useFetchImg(src);

    const address = useAddress();
    const { contract: approvalContract } = useContract(contractAddress);
    const {
        data: approvalData,
        isLoading: approvalIsLoading,
        error: approvalError,
    } = useContractRead(approvalContract, 'isApprovedForAll', [
        address,
        contractAddressSecond
    ]);

    useEffect(() => {
        if(data !== null){
            switch (data?.rarity) {
                case 'Common':
                    setRarityBorder('border-[#C2C2C2] text-[#C2C2C2]');
                    break;
                case 'Uncommon':
                    setRarityBorder('border-[#94FF88] text-[#94FF88]');
                    break;
                case 'Rare':
                    setRarityBorder('border-[#4BDEFD] text-[#4BDEFD]');
                    break;
                case 'Epic':
                    setRarityBorder('border-[#EB88FF] text-[#EB88FF]');
                    break;
                default:
                    setRarityBorder('border-[#C2C2C2] text-[#C2C2C2]');
                    break;
            }
        }
    }, [data, loading, error]);

    const NftMain = (props: any) => {

        const {
            controllers: { modal },
        } = useMarketplaceV2();
        const { item } = props;
        const style = {
            minHeight: '300px',
        };
        const badgeImg = <img alt="badge-logo" src={ Diggers[ digClass ].badgeImg} />;

        const handleBuy = (event: any) => {
            modal.handleOpen(`buy-Digger`);
            console.log(modal);
        };

        const handleError = (e: any) => {
            console.log(e);
            toast.error(`${e}`);
        }

        const handleSuccess = (e: any) => {
            console.log(e);
            toast.success(`NFT is now listed`);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }

        return loading ? <>Loading...</>:
        (
            <ContentWrapper>
                <Flex justifyContent="center" alignItems="center" style={{flexFlow: 'column nowrap', textAlign: 'center', margin: '0 1rem'}}>
                    <H3 fsize="1.5em">{data?.name}</H3>
                    <p
                        className={`border-2 ${rarityBorder} p-2 rounded-[5px] text-[12px]`}
                        style={{maxWidth: '6rem'}}
                    >
                        {data?.rarity}
                    </p>
                </Flex>
                <div>
                    <SpriteDisplay
                        {...{ spriteURL: data ? data.img : '' }}
                    />
                </div>
                <Box className="bg-gradient-to-b from-[#2A3169] to-[#141839]">
                    <TextWrapper align="center">
                        <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '1rem'}}>
                            <SvgIcon Img={badgeImg} width={60} height={60} />
                            <H4 fsize="1.5em">{data?.class}</H4>
                        </div>
                        <p style={{fontWeight: '500', textAlign: 'left', margin: '1rem 0 0 0'}}>
                            {data?.description}
                        </p>
                    </TextWrapper>
                </Box>
                { `${data?.listingData.seller}`.toUpperCase() !== `${address}`.toUpperCase() ?
                    <Web3Button
                        contractAddress={"0x90ba9328748cf652f9bba12be0436acf4f782076"} // Your smart contract address
                        contractAbi={ABI}
                        action={async (contract) => {
                            await contract.call("buy", [params.lid], { value: data?.listingData.price?.raw });
                        }}
                        className="w-full font-black text-[24px] uppercase rounded-b-[20px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                        onError={(e) => handleError(e)}
                        onSuccess={(e) => handleSuccess(e)}
                    >
                        Buy
                        &nbsp;
                        <img
                            src={tokenImage}
                            alt="Polygon MATIC"
                            className="w-[40px] h-[40px]"
                        />
                        &nbsp;
                        {data?.listingData.price?.token}
                    </Web3Button>
                    :
                    <Web3Button
                        theme="dark"
                        className="w-full font-black text-[24px] uppercase rounded-b-[20px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                        // contractAddress={contractAddress}
                        contractAddress={usedContract}
                        contractAbi={ABI}
                        action={async contract => {
                            // approve listing
                            if (!approvalData) {
                                console.log("Approving")
                                await contract.erc721.setApprovalForAll(
                                    contractAddressSecond,
                                    true,
                                );
                                console.log("Approved")
                                console.log("Cancelling Listing")
                                await contract.call('cancelListing', [
                                    params.lid,
                                ]);
                            } else {
                                await contract.call('cancelListing', [
                                    params.lid,
                                ]);
                            }
                            // listing id
                            // mutateAsyncSecond({
                            //   args: [listingId]
                            // })
                        }}
                        onSuccess={res => {
                            console.log('Listing cancelled');
                            toast.success(`${data?.name} listing cancelled`)
                            setTimeout(() => {
                            window.location.reload();
                            }, 500)
                            console.log(res);
                        }}
                    >
                        Cancel Listing
                    </Web3Button>
                }

                {modal.openModal[`buy-Digger`] && <PurchaseNFT {...{ ...item }} />}
            </ContentWrapper>
        );
    };

    const NftDetails = (props: any) => {
        const skillImg = isUnique  ?
                            <img alt="skill-logo" className='rounded-[20rem]' src={ `images/nfts/MSW/abilities/${Diggers[ digClass ].legendary.ability.img}` } />
                            :
                            <img alt="skill-logo" className='rounded-[20rem]' src={ `images/nfts/MSW/abilities/${Diggers[ digClass ].hats[ digHat ].ability.img}` } />
                            ;

        const eyes = Diggers[ digClass ].eyes
        const noses = Diggers[ digClass ].noses
        const clothes = Diggers[ digClass ].clothes

        const renderStats = () => (
            <>
                <Grid container spacing={1} mt={1}>
                    {isUnique ?
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
                { isUnique &&
                    <div style={{display: 'flex', flexFlow: 'column', margin: '1rem 0 0 0', gap: '0.5rem'}}>
                        <H4 fsize="1.5em">Modifiers</H4>
                        {data?.parts.eyes && eyes &&
                            <StatField>
                                <div>{data?.parts.eyes}</div>
                                <div style={{fontWeight: 1000}}>
                                    {eyes[data?.parts.eyes].stat.map((s, i) => {
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
                        {data?.parts.nose && noses &&
                            <StatField>
                                <div>{data?.parts.nose}</div>
                                <div style={{fontWeight: 1000}}>
                                    {noses[data?.parts.nose].stat.map((s, i) => {
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
                        {data?.parts.clothes && clothes &&
                            <StatField>
                                <div>{data?.parts.clothes}</div>
                                <div style={{fontWeight: 1000}}>
                                    {clothes[data?.parts.clothes].stat.map((s, i) => {
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
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1.6fr', width: '100%'}}>
                            <div style={{width: '100%'}}>
                                <SvgIcon Img={skillImg} width={100} height={100} />
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
                <Box className="bg-gradient-to-b from-[#2A3169] to-[#141839]">
                    <Flex>
                        <H4 fsize="1.5em">Base Stats</H4>
                    </Flex>
                    {renderStats()}
                </Box>
                <Box className="bg-gradient-to-b from-[#2A3169] to-[#141839]">
                    <Flex>
                        <H4 fsize="1.5em">
                            Ability: {isUnique ?
                                Diggers[ digClass ].legendary.ability.name
                            :
                                Diggers[ digClass ].hats[ digHat ].ability.name
                            }
                        </H4>
                    </Flex>
                    {renderSkill()}
                </Box>
            </ContentWrapper>
        );
    };

    const WrappedMain = withGridLayout(NftMain);
    const WrappedDetails = withGridLayout(NftDetails);

    return (
        <Main>
            <Link to='/marketplace'>
                <Iconloader  type='fa' name='ArrowLeft'/>
            </Link>
            <TextWrapper>
                <StyledDiv>
                    <Grid container spacing={5}>
                        <WrappedMain nftId={params.id} />
                        <WrappedDetails nftId={params.id} />
                    </Grid>
                </StyledDiv>
            </TextWrapper>
        </Main>
    );
};

export default NftPage;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    padding: 15px 0px;
`;
