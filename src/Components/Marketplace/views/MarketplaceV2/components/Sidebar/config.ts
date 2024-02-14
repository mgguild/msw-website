import { marketplaceURL } from 'views/MarketplaceV2/constants/config'
import { Props } from './index.d'

export const links: Props = [
  {
    name: 'Home',
    href: `${marketplaceURL}/`,
  },
  {
    name: 'User',
    href: `${marketplaceURL}/profile`,
  },
  {
    name: 'ShoppingBasket',
    href: `${marketplaceURL}/marketplace`,
  },
]
