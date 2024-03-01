import React from 'react';
import * as FaIconModule from 'react-icons/fa';
import * as FaIconSixModule from 'react-icons/fa6';
import * as FiIconModule from 'react-icons/fi';
import { Props } from './index.d';

const faIcons = FaIconModule as unknown as { [key: string]: React.FC }
const faSixIcons = FaIconSixModule as unknown as { [key: string]: React.FC }
const fiIcons = FiIconModule as unknown as { [key: string]: React.FC }

const Iconloader = ({ type, name, ...rest }: Props) => {
    const capitalizeFirstLetter = (input: string): string => {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };

    const src = capitalizeFirstLetter(type) + name;
    const [icon, setIcon] = React.useState<any | null>(null);

  React.useEffect(() => {
    const activeModule = (op: string) => {
      switch (op.toLowerCase()) {
        case 'fa':
          return setIcon(faIcons[src])
        case 'fi':
          return setIcon(fiIcons[src])
        case 'fa6':
          return setIcon(faSixIcons[src])
        default:
          return setIcon(faIcons[src])
      }
    }
    activeModule(type)
    return () => setIcon(null)
  }, [type, src])

  return <span {...rest} className="text-[#C2C2C2] text-[32px]">{icon}</span>
}

export default Iconloader;
