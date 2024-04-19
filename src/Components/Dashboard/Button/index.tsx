import { FC } from 'react';

type ButtonProps = {
    value?: string;
    secondary?: any;
};

const Button: FC<ButtonProps> = props => {
    const { value, secondary } = props;

  return (
    <button className={`${secondary ? 'bg-[#7900FF]' : 'bg-[#FFB800]'} p-3 skew-x-[-6deg] rounded-[5px]`}>
      <p className=" m-0 font-bold uppercase text-[28px] skew-x-[6deg]">{value}</p>
    </button>
  )
}

export default Button;
