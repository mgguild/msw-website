import BigNumber from "bignumber.js";
import { BIG_TEN } from "./bigNumber";

export const toBigNumber = (amount: string) => {
  return new BigNumber(amount)
};

export const getDecimalAccount = (amount: string, decimals: number = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
};

export const getBalanceAmount = (amount: BigNumber, decimals: number = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};

export const getBalanceNumber = (balance: BigNumber, decimals: number = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (balance: BigNumber, decimals: number = 18, decimalsToAppear?: number) => {
  return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear);
};

export const formatNumber = (number: number, minPrecision: number = 2, maxPrecision: number = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };

  return number.toLocaleString(undefined, options);
};