import React, { useState } from 'react';
import styled from 'styled-components';
import { H1, TextWrapper } from '../../components/Foundation/Text';
import Filters from '../../components/Filters';
import Main from '../Main';
import Nftlist from './Nftlist';
import {
    useOwnedNFTs,
    useContract,
    useAddress,
    useContractWrite,
} from '@thirdweb-dev/react';
import { Web3Button } from '@thirdweb-dev/react';
import { useMarketplaceV2FetchData } from '../../../../hooks/useMarketplaceV2Data';
import maticToWei from '../../../../utils/maticToWei';
import NeedCreds from '../../../../../Modals/NeedCreds';

const Market = () => {
    const OwnedNFTs = () => {
        const contractAddress = '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78';
        const contractAddressSecond = '0x90ba9328748cf652f9bba12be0436acf4f782076';
        const address = useAddress();
        const { contract } = useContract(contractAddress);
        const { contract: contractSecond } = useContract(contractAddressSecond);
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
        const { data, isLoading, error } = useOwnedNFTs(contract, address);
        const { data: marketplaceData } = useMarketplaceV2FetchData();

        const [maticInput, setMaticInput] = useState<number>(0);
        const [weiValue, setWeiValue] = useState<number>(0);
        const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget;
            setMaticInput(parseFloat(value));
            const wei = maticToWei(parseFloat(value));
            setWeiValue(wei);
        };

        return (
            <>
                <NeedCreds wallet={true} walletConnect={true} sameWallet={true} />
                {!isLoading &&
                    data?.map(nft => {
                        const isSelling = marketplaceData.find(
                            (item: { id: string }) => item.id === nft.metadata.id,
                        );
                        const listingIndex = marketplaceData.findIndex(
                            (item: { id: string }) => item.id === nft.metadata.id,
                        );
                        let listingId = -1;
                        if (listingIndex !== -1) {
                            // eslint-disable-next-line prefer-destructuring
                            listingId = marketplaceData[listingIndex].listingId;
                        }

                        return (
                            <>
                                <img
                                    src={nft.metadata.image as string}
                                    alt="Digger Image"
                                />
                                <p className="font-bold">{nft.metadata.name}</p>
                                <input
                                    type="number"
                                    value={maticInput}
                                    onChange={handleInput}
                                    className={`${
                                        marketplaceData.find(
                                            (item: { id: string }) =>
                                                item.id === nft.metadata.id,
                                        ) && 'hidden'
                                    }`}
                                    placeholder="Type price in MATIC"
                                />
                                {isSelling ? (
                                    <Web3Button
                                        contractAddress={contractAddress}
                                        action={async contract => {
                                            // approve listing
                                            await contract.erc721.setApprovalForAll(
                                                '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78',
                                                true,
                                            );
                                            // listing id
                                            mutateAsyncSecond({
                                                args: [listingId],
                                            });
                                        }}
                                    >
                                        Cancel Listing
                                    </Web3Button>
                                ) : (
                                    <Web3Button
                                        isDisabled={maticInput < 0 && true}
                                        contractAddress={contractAddress}
                                        action={async contract => {
                                            // approve listing
                                            await contract.erc721.setApprovalForAll(
                                                '0xa80c5C9d7d3CF9988f33B30492e3A3556F094b78',
                                                true,
                                            );
                                            // contract, token id, price in wei
                                            mutateAsync({
                                                args: [
                                                    contractAddress,
                                                    nft.metadata.id,
                                                    weiValue.toString(),
                                                ],
                                            });
                                        }}
                                    >
                                        Sell
                                    </Web3Button>
                                )}
                            </>
                        );
                    })}
                {error && <p>Something went wrong</p>}
            </>
        );
    };

  return (
    <div style={{ width: '100%' }}>
      <Main>
        <Filters />
        <div className="mt-5">
          <Nftlist />
        </div>
      </Main>
    </div>
  )
}

export default Market
