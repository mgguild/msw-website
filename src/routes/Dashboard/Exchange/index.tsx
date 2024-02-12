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
      <div className="bg-[#0F1637] rounded-[5px] w-full h-[131px] p-5 flex flex-wrap justify-around items-center my-[2em] gap-5">
        <p>Contract Address: <span className="text-[#FFB800]">1234567890</span></p>
        <p>In-Game Balance: <span>1234567890</span></p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Button value="deposit to game" />
        <Button value="withdraw to wallet" secondary />
      </div>
      <div>
        <div className="bg-[#0F1637] rounded-[5px] w-full p-5 my-[2em] gap-5">
          <p className="uppercase text-[48px] font-bold text-center">Transactions</p>
          <div className="flex flex-wrap justify-start items-center gap-5">
            <div onClick={() => setActiveSection(0)}>Deposits</div>
            <div onClick={() => setActiveSection(1)}>Withdraws</div>
            <div onClick={() => setActiveSection(2)}>Completed</div>
          </div>
          <div className="line justify-center my-4"></div>
          <div className="flex flex-col justify-center items-center text-center">
            {activeSection === 0 && <ExchangeDeposit />}
            {activeSection === 1 && <ExchangeWithdraw />}
            {activeSection === 2 && <ExchangeCompleted />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Exchange