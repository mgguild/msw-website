import { marketplaceURL } from 'views/MarketplaceV2/constants/config'
import { Props } from './index.d'

export const links: Props = [
  {
    name: 'Home',
    href: `${marketplaceURL}/nft`,
  },
  {
    name: 'User',
    href: `${marketplaceURL}/my-page`,
  },
  {
    name: 'ShoppingBasket',
    href: `${marketplaceURL}/market`,
  },
  {
    name: 'Globe',
    href: `${marketplaceURL}/web`,
  },
  {
    name: 'Users',
    href: `${marketplaceURL}/groups`,
  },
]
