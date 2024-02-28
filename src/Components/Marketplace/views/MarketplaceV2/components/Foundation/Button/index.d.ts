import React from 'react';

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  iconType?: string;
  icon?: string;
  variant?: any;
  p?: string;
  m?: string;
  height?: string;
}
