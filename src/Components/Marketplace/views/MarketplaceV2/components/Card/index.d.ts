import { CardType } from 'contexts/index.d';

interface rarityColors {
  [key: string]: string;
}

export const RarityColors: rarityColors = {
  LEGENDARY: '#ecb602',
  EPIC: '#a535ca',
  RARE: '#35d247',
};

export type Props = CardType;
