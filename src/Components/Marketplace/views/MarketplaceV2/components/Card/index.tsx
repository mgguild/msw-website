import React, { useMemo, useCallback, useState, useEffect } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import useMarketplaceV2, {
    useQueryAsset,
    QueryType,
} from '../../../../hooks/useMarketplaceV2';
import useTheme from '../../../../hooks/useTheme';
import { Props } from './index.d';
import { CardContainer, Details, CardText as TextBox, Button } from './styled';
import { H5, P } from '../Foundation/Text';
import PurchaseNFT from '../Modals/Buy-nft';
import Header from './Header';
import SpriteDisplay from './Display';
import ABI from '../../constants/abi.json';
import { Web3Button } from '@thirdweb-dev/react';
import { useFetchImg } from '../../../../utils/assetFetch';

export default function Card(props: Props) {
    const { theme } = useTheme();
    const { id, listingId, name, spriteName, rarity, price, badge } = props;
    const { controllers } = useMarketplaceV2();
    const { modal } = controllers;
    const navigate = useNavigate();

    const handleNav = (event: any) => {
        event.preventDefault();

        navigate(`/marketplace/${badge}/${id}`);
    };

    const handleBuy = async (event: any) => {
        event.stopPropagation();
    };

    const src = { name: 'polygon-matic-logo', folder: 'logo' };
    const image = useFetchImg(src);

    const [rarityBorder, setRarityBorder] = useState<string>('');

    useEffect(() => {
        switch (rarity) {
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
    }, [rarity]);

    return (
        <>
            {/* <CardContainer className="secondary-drop-shadow">
        <Header {...{ name, rarity, badge }} />
        <img src={spriteName} />
        <Details className="flex">
          <TextBox className="flex-none w-1/2">
            <H5 fsize="0.8em">Current Price</H5>
            <P fsize="1em" color={theme.colors.MGG_accent2}>
              {price.token}
            </P>
          </TextBox>
          <Web3Button
            contractAddress={process.env.REACT_APP_MARKETPLACE_ADDRESS as string} // Your smart contract address
            contractAbi={ABI}
            action={async (contract) => {
              await contract.call("buy", [listingId], { value: price.raw });
            }}
            className='flex-1 w-2/6'
            style={{ minWidth: "0", maxWidth: "50%", wordBreak: "break-word", textAlign: "center" }}
          >
            Buy
          </Web3Button>
        </Details>
      </CardContainer>
      {modal.openModal[`buy-${listingId}`] && <PurchaseNFT {...props} />} */}
            <div className="w-[20%] bg-gradient-to-b from-[#2A3169] to-[#141839] rounded-[20px]">
                <div>
                    <img src={spriteName} alt="Digger" className="rounded-t-[20px]" />
                </div>
                <div className="py-3 px-3">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-[32px] text-[#C2C2C2] font-bold grow">
                            {name}
                        </p>
                        <p
                            className={`border-2 ${rarityBorder} p-2 rounded-[5px] text-[12px]`}
                        >
                            {rarity}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <p className="flex flex-row justify-start items-center gap-2 text-[24px] font-bold text-[#49D9F8]">
                            <span className="rounded">
                                <img
                                    src={image}
                                    alt="Polygon MATIC"
                                    className="w-[40px] h-[40px]"
                                />
                            </span>
                            {price.token}
                        </p>
                        <p></p>
                        {/* <p>$0.00</p> */}
                    </div>
                </div>
                <div className="w-full">
                    <Web3Button
                        contractAddress={
                            process.env.REACT_APP_MARKETPLACE_ADDRESS as string
                        } // Your smart contract address
                        contractAbi={ABI}
                        action={async contract => {
                            await contract.call('buy', [listingId], { value: price.raw });
                        }}
                        className="w-full font-black text-[32px] uppercase rounded-b-[20px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
                    >
                        Buy
                    </Web3Button>
                </div>
            </div>
        </>
    );
}
