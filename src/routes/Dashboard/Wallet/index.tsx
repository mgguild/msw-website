import {FC} from "react"
import { Button } from "../../../Components/Dashboard"

const Wallet: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
        <p className="text-[36px] font-bold">Crypto Wallet</p>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-[131px] p-5 flex flex-wrap justify-center items-center mb-[2em] gap-3">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit ipsam quas earum beatae quidem fugiat soluta impedit ullam facilis.</p>
        <Button value="connect wallet" />
      </div>
    </>
  )
}

export default Wallet