import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
import { getRarity, getRarityBorder } from './utils';
import { nftData } from './NftCollection';


const contractAddress = '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78';
const contractAddressSecond = '0x90ba9328748cf652f9bba12be0436acf4f782076';

interface Props {
    data: NFT[] | undefined;
    marketplaceData: CardType[] | [];
    start: number;
    count: number;
    setNftData: React.Dispatch<React.SetStateAction<nftData | undefined>>;
    setNFTModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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
        contractAddressSecond
    ]);

    const [usedContract, setUsedContract] = useState<string>(contractAddressSecond);

    useEffect(() => {
        setModalVisible(modalVisible);
        console.log("address is approved", approvalData)
        if (approvalData) {
            setUsedContract(contractAddressSecond);
        } else {
            setUsedContract(process.env.REACT_APP_MARKETPLACE_ADDRESS as string);
            //setUsedContract(contractAddressSecond);
        }
    }, [modalVisible, modalActive, approvalData, approvalIsLoading, approvalError]);

    return (
        <>
           <Modal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                aria-labelledby="modal-selling"
                aria-describedby="modal-selling"
           >
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
                                        <p>Are you sure you want to cancel the listing?</p>
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
                                                console.log("Approving")
                                                await contract.erc721.setApprovalForAll(
                                                    contractAddressSecond,
                                                    true,
                                                );
                                                console.log("Approved")
                                                console.log("Cancelling Listing")
                                                await contract.call('cancelListing', [
                                                    listingId,
                                                ]);
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
                                            toast.success(`Digger #${nft.metadata.id} listing cancelled`)
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
                                            console.log(usedContract)
                                            // approve listing
                                            if (!approvalData) {
                                                console.log("Approving")
                                                await contract.erc721.setApprovalForAll(
                                                    contractAddressSecond,
                                                    true,
                                                );
                                                console.log("Approved")
                                                console.log("Listing...")
                                                await contract.call('createListing', [
                                                    contractAddress,
                                                    nft.metadata.id,
                                                    weiValue.toString(),
                                                ]);
                                            } else {
                                                console.log("creating listing...")
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
                                        onError={res => {
                                            console.log('Error selling!');
                                            console.log(res);
                                            toast.error(`Error: ${res}`)
                                        }}
                                        onSuccess={res => {
                                            console.log('Success selling');
                                            console.log(res);
                                            toast.success(`NFT is now listed`)
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
           </Modal>
        </>
    );
};

const FetchNFT:React.FC<Props> = ({data, marketplaceData, start: _start, count: _count, setNftData, setNFTModal}) => {

    const [modalActive, setModalActive] = useState<boolean[]>([]);

    const handleToggleModal = (index: number) => {
        setModalActive(prevVisibility => {
            const updatedVisibility = [...prevVisibility];
            updatedVisibility[index] = !updatedVisibility[index];
            return updatedVisibility;
        });
    };

    const handleNFTClick = (data: nftData) => {
        setNftData(data);
        setNFTModal(true);
    }

    return (
        <>
            {
                data?.map((nft, key) => {
                    const isSelling = marketplaceData.find(
                        (item: { id: string }) => item.id === nft.metadata.id,
                    );

                    const attributes:any = nft.metadata.attributes ? Object.values(nft.metadata.attributes) : [];
                    const rarity = getRarity(attributes)
                    const badgeImg = <img alt="badge-logo" src={ Diggers[ attributes[0].value ].badgeImg} />;

                    return (
                        <div key={key} className="w-[300px]">
                            <CardContainer className="secondary-drop-shadow">
                                <div onClick={() => handleNFTClick({
                                        name: nft.metadata.name as string ?? '',
                                        image: nft.metadata.image ?? '',
                                        description: nft.metadata.description ?? '',
                                        rarity: rarity,
                                        attributes: attributes,
                                    })
                                }>
                                    <img src={nft.metadata.image as string} alt="Digger" />
                                    <BadgeContainer>
                                        <SvgIcon Img={badgeImg} width={60} height={60} />
                                    </BadgeContainer>
                                    <CardHeader>
                                        <p className="text-[24px] text-[#C2C2C2] font-bold grow">{nft.metadata.name}</p>
                                        <p
                                            className={`border-2 ${getRarityBorder(rarity)} p-2 rounded-[5px] text-[12px]`}
                                            style={{maxWidth: '6rem'}}
                                        >{rarity}</p>
                                    </CardHeader>
                                </div>
                                <button onClick={() => handleToggleModal(key)}
                                    className="uppercase w-100 font-bold text-[24px] py-3 rounded-b-[5px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                                >
                                    {
                                        isSelling ? 'Cancel Listing' : 'Sell'
                                    }
                                </button>
                                {modalActive[key] && <SellModal key={key} modalActive={modalActive[key]} nft={nft} isSelling={isSelling} marketplaceData={marketplaceData} handleCloseModal={() => handleToggleModal(key)} />}
                            </CardContainer>
                        </div>
                    )
                })
            }
        </>
    )
}

export default FetchNFT