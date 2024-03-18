import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import useMarketplaceV2, {
    useQueryAsset,
    QueryType,
} from '../../../../hooks/useMarketplaceV2';
import useTheme from '../../../../hooks/useTheme';
import { Props } from './index.d';
import ABI from '../../constants/abi.json';
import { Web3Button } from '@thirdweb-dev/react';
import { useFetchImg } from '../../../../utils/assetFetch';

const CardContainer = styled.div`
  position: relative;
`

const PriceDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  color: #49D9F8;
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`

export default function Card(props: Props) {
    const { theme } = useTheme();
    const { id, listingId, name, spriteName, rarity, price, badge } = props;
    const { controllers } = useMarketplaceV2();
    const { modal } = controllers;
    const navigate = useNavigate();

    const handleNav = (event: any) => {
        event.preventDefault();
    };

    const handleBuy = async (event: any) => {
        event.stopPropagation();
    };

    const src = { name: 'polygon-matic-logo', folder: 'logo' };
    const image = useFetchImg(src);

    const badgeSrc = { name: badge, folder: 'classIcons' }
    const badgeImage = useFetchImg(badgeSrc)

    const [rarityBorder, setRarityBorder] = useState<string>('');

  useEffect(() => {
    switch (rarity) {
      case "Common":
        setRarityBorder("border-[#C2C2C2] text-[#C2C2C2]")
        break;
      case "Uncommon":
        setRarityBorder("border-[#94FF88] text-[#94FF88]")
        break;
      case "Rare":
       setRarityBorder("border-[#4BDEFD] text-[#4BDEFD]")
        break;
      case "Epic":
        setRarityBorder("border-[#EB88FF] text-[#EB88FF]")
        break;
      default:
        setRarityBorder("border-[#C2C2C2] text-[#C2C2C2]")
        break;
    }
  }, [rarity])

  const handleError = (e: any) => {
    console.log(e);
    toast.error(`${e}`);
  }

  const handleSuccess = (e: any) => {
    console.log(e);
    toast.success(`${e}`);
  }


  return (
    <CardContainer className="w-[300px] bg-gradient-to-b from-[#2A3169] to-[#141839] rounded-[20px]">
        <img style={{position: 'absolute', top: '0.5rem', right: '0.5rem'}} src={badgeImage} alt="Badge" className="w-[60px] h-[60px]" />
        <Link to={`/marketplace/NFT/${id}/${listingId}`}>
            <img src={spriteName} alt="Digger" className="rounded-t-[20px] w-full h-auto" />
        </Link>
      <div className="py-3 px-3">
        <div className="flex flex-row justify-between items-center">
          <p className="text-[24px] text-[#C2C2C2] font-bold grow">{name}</p>
          <p className={`border-2 ${rarityBorder} p-2 rounded-[5px] text-[12px]`}>{rarity}</p>
        </div>
        <PriceDetails>
            <span className="rounded">
              <img src={image} alt="Polygon MATIC" className="w-[40px] h-[40px]" />
            </span>
            {price.token}
          {/* <p>$0.00</p> */}
        </PriceDetails>
      </div>
      <div className="w-full">
        <Web3Button
          contractAddress={"0x90ba9328748cf652f9bba12be0436acf4f782076"} // Your smart contract address
          contractAbi={ABI}
          action={async (contract) => {
            await contract.call("buy", [listingId], { value: price.raw });
          }}
          className="w-full font-black text-[24px] uppercase rounded-b-[20px] rounded-t-[0px] text-white bg-gradient-to-b from-[#ECB602] to-[#EC7202]"
          onError={(e) => handleError(e)}
          onSuccess={(e) => handleSuccess(e)}
        >
          Buy
        </Web3Button>
      </div>
    </CardContainer>
  )
}
