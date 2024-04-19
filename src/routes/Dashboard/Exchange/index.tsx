import {FC, useState} from "react"
import { Button } from "../../../Components/Dashboard"
import { ExchangeCompleted, ExchangeDeposit, ExchangeWithdraw } from "../../../Components/Dashboard/Exchange"

const Exchange: FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0)

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <p className="uppercase text-[48px] font-bold">Withdraw & Deposit</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-auto p-5 flex flex-col justify-around items-center my-[2em] gap-5">
        <p className="uppercase text-[24px] font-bold">Purchase MGG Tokens</p>
        <div className="flex flex-wrap justify-around w-full items-center gap-2">
          <a href="https://sparkswap.finance/" target="_blank" rel="noreferrer" className="text-[#FFB800]">SparkSwap</a>
          <a href="https://pancakeswap.finance/swap" target="_blank" rel="noreferrer" className="text-[#FFB800]">Pancake Swap</a>
        </div>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-auto p-3 flex flex-wrap justify-around items-center my-[2em] gap-5">
        <p className="m-0">Contract Address: <span className="text-[#FFB800]">1234567890</span></p>
        <p className="m-0">In-Game Balance: <span>1234567890</span></p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Button value="deposit to game" />
        <Button value="withdraw to wallet" secondary />
      </div>
    </>
  )
}

export default Exchange