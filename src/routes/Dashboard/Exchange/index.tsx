import {FC, useState} from "react"
import { Button } from "../../../Components/Dashboard"
import { ExchangeCompleted, ExchangeDeposit, ExchangeWithdraw } from "../../../Components/Dashboard/Exchange"
import Pancake from "./Pancake.png"
import SparkSwap from "./SparkSwap.png"

const Exchange: FC = () => {
    const [activeSection, setActiveSection] = useState<number>(0);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <p className="uppercase text-[48px] font-bold">Withdraw & Deposit</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-auto p-5 flex flex-col justify-around items-center my-[2em] gap-5">
        <p className="uppercase text-[24px] font-bold">Purchase MGG Tokens</p>
        <div className="flex flex-wrap justify-around w-full items-center gap-2">
          <a href="https://sparkswap.finance/" target="_blank" rel="noreferrer" className="text-[#FFB800] flex flex-col justify-center items-center gap-2">
            <img src={SparkSwap} alt="SparkSwap logo" />
            <p>SparkSwap</p>
          </a>
          <a href="https://pancakeswap.finance/swap" target="_blank" rel="noreferrer" className="text-[#FFB800] flex flex-col justify-center items-center gap-2">
            <img src={Pancake} alt="Pancake Swap logo" />
            <p>Pancake Swap</p>
          </a>
        </div>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-auto p-3 flex flex-wrap justify-around items-center my-[2em] gap-5">
        <p className="m-0">Contract Address: <span className="text-[#FFB800]"><a href="https://etherscan.io/address/0x7237c0b30b1355f1b76355582f182f6f04b08740" target="_blank" rel="noreferrer" className="text-[#FFB800] underline">0x7237c0b30b1355f1b76355582f182f6f04b08740</a></span></p>
        <p className="m-0">In-Game Balance: <span>0</span></p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Button value="deposit to game" />
        <Button value="withdraw to wallet" secondary />
      </div>
    </>
  )
}

export default Exchange;
