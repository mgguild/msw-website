import { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '../state';
import { orderBy } from 'lodash';
import {
  AchievementState,
  Farm,
  FarmsState,
  Guildpad,
  GuildpadState,
  PlayfabState,
  PFuserState,
  Pool,
  ProfileState,
  State,
  TeamsState,
  ThirdwebState,
} from './types';
import { MAINNET_CHAIN_ID } from '../config';
import { useDispatch } from 'react-redux';

/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP
 * 252 = BUSD-BNB LP
 */

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms);
  return farms;
};

// Pools

// Profile

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector(
    (state: State) => state.profile,
  );
  return {
    profile: data,
    hasProfile: isInitialized && hasRegistered,
    isInitialized,
    isLoading,
  };
};

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector(
    (state: State) => state.achievements.data,
  );
  return achievements;
};

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block);
};

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock);
};

// Predictions
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen);
};

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen);
};

export const useGetRounds = () => {
  return useSelector((state: State) => state.predictions.rounds);
};

export const useGetSortedRounds = () => {
  const roundData = useGetRounds();
  return orderBy(Object.values(roundData), ['epoch'], ['asc']);
};

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch);
};

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks);
};

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks);
};

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks();
  const bufferBlocks = useGetBufferBlocks();
  return intervalBlocks + bufferBlocks;
};

export const useGetRound = (id: string) => {
  const rounds = useGetRounds();
  return rounds[id];
};

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch();
  const rounds = useGetSortedRounds();
  return rounds.find(round => round.epoch === currentEpoch);
};

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status);
};

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.predictions.historyFilter);
};

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber);
};

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount);
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount]);
};

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory);
};

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history);
};

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory();
  return bets ? bets[account] : [];
};

export const useGetBetByRoundId = (account: string, roundId: string) => {
  const bets = useSelector((state: State) => state.predictions.bets);

  if (!bets[account]) {
    return null;
  }

  if (!bets[account][roundId]) {
    return null;
  }

  return bets[account][roundId];
};

export const useGetLastOraclePrice = (): BigNumber => {
  const lastOraclePrice = useSelector(
    (state: State) => state.predictions.lastOraclePrice,
  );
  return new BigNumber(lastOraclePrice);
};

// Launchpad or Guildpad

export const useGuildpads = (): GuildpadState => {
  const guildpads = useSelector((state: State) => state.guildpads);
  return guildpads;
};

export const useGuildpad = () => {
  const guildpad = useSelector((state: State) => state.guildpads.selected);
  return guildpad;
};

// Thirdweb
export const useFetchOwnerNFTs = () => {
  const nfts = useSelector((state: ThirdwebState ) => state.ownerNFTs)
  return nfts
}
