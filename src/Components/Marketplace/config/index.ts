import BigNumber from 'bignumber.js';
import { BIG_TEN } from '../utils/bigNumber';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const BSC_BLOCK_TIME = 3;

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 10 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeStats.tsx = 20 (40 - Amount sent to burn pool)

export const CAKE_PER_BLOCK = new BigNumber(40);
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR);
// export const BASE_URL = 'https://pancakeswap.finance'
export const BASE_URL = 'https://pancakeswap.finance';
export const BASE_EXCHANGE_URL = 'https://pancakeswap.finance';
export const BASE_INFO_URL = 'https://pancakeswap.finance/info/pool/';
export const CAKE_INFO_URL = 'https://pancakeswap.finance/info/pool/';
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/add`;
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/swap`;
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/pool`;
export const BASE_SPARKSWAP_INFO = 'https://sparkswap.info/#/token/';
export const PANCAKE_EXCHANGE_URL = 'https://pancakeswap.finance';
export const PANCAKE_ADD_LIQUIDITY_URL = `${PANCAKE_EXCHANGE_URL}/add`;
export const BASE_BSC_SCAN_URL = 'https://bscscan.com';
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50;
export const LOTTERY_TICKET_PRICE = 1;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const DEFAULT_GAS_LIMIT = 200000;
export const DEFAULT_GAS_PRICE = 5;
export const TESTNET_CHAIN_ID = '97';
export const MAINNET_CHAIN_ID = '56';
export const MAINNET_ETH_CHAIN_ID = '1';
export const ROPSTEN_CHAIN_ID = '3';
export const EPOCH_PER_YEAR = 31556926;
export const SPARKSWAP_API = 'https://api.pancakeswap.info/api/v2/';
export const API_ASSETS = 'tokens';
export const API_SUMMARY = 'summary';
export const API_DATA = 'data';
export const API_LIQUIDITY = 'liquidity';
export const API_LASTPRICE = 'price';
export const multiChainSupport = {
  LP_STAKING: ['1', '56'],
  POOL_STAKING: ['56', '97'],
  MARKETPLACE: ['56'],
  LAUNCHPAD: ['56'],
  GAMEFI: ['56'],
};

export const BASE_BSC_SCAN_URLS = {
  [MAINNET_CHAIN_ID]: 'https://bscscan.com',
  [TESTNET_CHAIN_ID]: 'https://testnet.bscscan.com',
};
