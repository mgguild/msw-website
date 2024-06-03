import { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '../state';
import { orderBy } from 'lodash';
import {
  PlayfabState,
  PlayfabUserData,
  PlayfabCloudScriptResult,
  PFGuildData,
  UserGuildData,
  State,
  ThirdwebState,
} from './types';
import { MAINNET_CHAIN_ID } from '../config';
import { useDispatch } from 'react-redux';


// Thirdweb
export const useFetchOwnerNFTs = () => {
  const nfts = useSelector((state: State) => state.thirdweb);
  return nfts;
};

// Playfab
export const useRGuild = (): UserGuildData => {
  const guild = useSelector((state: State) => state.playfab.user.guild);
  return guild;
}


export const useFetchGuildList = (): PFGuildData[] | null => {
  const list = useSelector((state: State) => state.playfab.guildList);
  return list;
}

export const useGetUser = (): PlayfabUserData => {
  const user = useSelector((state: State) => state.playfab.user);
  return user;
}