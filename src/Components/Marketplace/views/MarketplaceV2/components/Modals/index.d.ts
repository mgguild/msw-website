export type Props = {
  children: any;
  type: string;
  withClose?: boolean;
};

export enum CONFIRM_TYPE {
  success = 'success',
  failed = 'failed',
  canceled = 'canceled',
}

export type ConfirmProps = {
  type: CONFIRM_TYPE;
  icon: string;
  description: string;
};

export const warningMsg = `
  This transaction is not subject to cancellation. Any returns/refunds are not accepted.
`;
