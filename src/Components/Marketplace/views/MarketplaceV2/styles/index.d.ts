export enum POSITION {
  p = 'padding',
  pt = 'padding-top',
  pb = 'padding-bottom',
  pl = 'padding-left',
  pr = 'padding-right',
  m = 'margin',
  mt = 'margin-top',
  mb = 'margin-bottom',
  ml = 'margin-left',
  mr = 'margin-right',
}
export type Margins = {
  m?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
};

export type Paddings = {
  p?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
};
