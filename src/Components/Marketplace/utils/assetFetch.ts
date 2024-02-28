/* eslint-disable import/prefer-default-export */

import tokens from '../config/constants/tokens';
import { Token, Address } from '../config/constants/types';
import { getAddress } from './addressHelpers';

// use this for Header Banners
export const useFetchBanner = (symbol: string) => {
  return `./images/guildpad-assets/${symbol}Banner.png`;
};

// use this for pad backgrounds
export const useFetchPadBG = (symbol: string) => {
  return `./images/guildpad-assets/${symbol}PadBG.png`;
};

export const useFetchImage = (symbol: string) => {
  return `./images/guildpad-assets/${symbol}.png`;
};

export const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(
    token.symbol === 'BNB'
      ? (tokens.wbnb.address as Address)
      : (token.address as Address),
  );
  return `./images/tokens/${address}.${token.iconExtension ?? 'svg'}`;
};

// Marketplace

export const useFetchAssetsLocal = () => {
  return './images/marketplace-assets';
};

export const useFetchImg = ({
  name,
  folder,
  extension,
}: {
  name: string;
  folder?: string;
  extension?: string;
}) => {
  const origin = useFetchAssetsLocal();
  const fldr = folder ?? 'logo';
  return `${origin}/${fldr}/${name}.${extension ?? 'png'}`;
};
