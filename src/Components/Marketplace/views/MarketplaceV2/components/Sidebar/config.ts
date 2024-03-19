import { marketplaceURL } from '../../constants/config';
import { Props } from './index.d';

export const links: Props = [
  {
    name: 'Home',
    href: `${marketplaceURL}/marketplace`,
  },
  {
    name: 'User',
    href: `${marketplaceURL}/marketplace/profile`,
  },
  {
    name: 'ShoppingBasket',
    href: `${marketplaceURL}/marketplace/NFT`,
  },
];
