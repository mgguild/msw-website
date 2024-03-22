import { MarketplaceV2Context } from '../contexts/MarketplaceContext';
import { useContext, useEffect, useState } from 'react';

export enum QueryType {
  BADGES = 'badges',
  SPRITES = 'sprites',
}

export const useQueryAsset = (q: { name: string; type: QueryType }) => {
  const { badges, sprites } = useMarketplaceV2();
  const [result, setResult] = useState({});

  const findItem = (source: any, name: any) => {
    const item = source.find((src: any) => {
      return src.name === `${name}.png`;
    });
    return item?.id;
  };

  useEffect(() => {
    switch (q.type) {
      case QueryType.BADGES:
        setResult(findItem(badges, q.name));
        break;
      case QueryType.SPRITES:
        // Perform special cleaning
        setResult(findItem(sprites, q.name));
        break;
      default:
        return () => null;
    }
    return () => console.log('Cleared...');
  }, [q, badges, sprites, result]);

  return result;
};

const useMarketplaceV2 = () => {
  return useContext<any>(MarketplaceV2Context);
};

export default useMarketplaceV2;
