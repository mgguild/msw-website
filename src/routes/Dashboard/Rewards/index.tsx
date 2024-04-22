import {FC, useState} from "react"
import usePlayfab from "../../../Hooks/usePlayfab"

const EligibleContent: FC = () => {
  return (
    <>
      <p>Eligible Content</p>
    </>
  )
}

const AllContent: FC = () => {
  return (
    <>
      <p>All Content</p>
    </>
  )
}

const CompletedContent: FC = () => {
  return (
    <>
      <p>Completed Content</p>
    </>
  )
}

const Rewards: FC = () => {
  const user = usePlayfab((state: any) => state.user)
  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
        <p className="font-bold text-[48px]">Welcome{(user?.TitleInfo?.DisplayName !== undefined ? `, ${user?.TitleInfo?.DisplayName}` : "")}!</p>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div className="bg-[#0F1637] rounded-[5px] w-[55%] h-auto p-5 flex flex-col justify-start items-center mb-[2em]">
          <div className="flex flex-wrap justify-start items-start gap-3 w-full border-b-[1px] border-[#2B326A] pb-2">
            <button onClick={() => setActiveTab(0)} className={`${activeTab === 0 && "border-b-[3px] border-[#19297F] pb-2 mb-[-1em]"}`}>Eligible</button>
            <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 && "border-b-[3px] border-[#19297F] pb-2 mb-[-1em]"}`}>All</button>
            <button onClick={() => setActiveTab(2)} className={`${activeTab === 2 && "border-b-[3px] border-[#19297F] pb-2 mb-[-1em]"}`}>Completed</button>
          </div>
          <div className="mt-5">
            {activeTab === 0 && <EligibleContent />}
            {activeTab === 1 && <AllContent />}
            {activeTab === 2 && <CompletedContent />}
          </div>
        </div>
        <div className="bg-[#0F1637] rounded-[5px] w-[30%] h-full p-5 flex-auto flex-col justify-start items-center mb-[2em]">
          <div className="text-center">
            <p>You can claim your rewards in game</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rewards
