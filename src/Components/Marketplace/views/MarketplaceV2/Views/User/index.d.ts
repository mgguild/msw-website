import { CardType } from "contexts/index.d";

export enum FIELD_INFO {
  email = 'EMAIL ADDRESS',
  wallet = 'WALLET ADDRESS',
  credit = 'CREDIT CARD',
}

export enum STATUS {
  success = '#4cae43',
  fail = '#b93a45'
}


export type TableProps = {
    date: string;
    status: string;
    tx: string;
    amount: string;
    type: string
}

export type NftProps = CardType