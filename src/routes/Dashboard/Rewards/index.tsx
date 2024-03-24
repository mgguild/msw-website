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
        <p className="font-bold text-[48px]">Welcome, {user?.TitleInfo?.DisplayName || "Username"}!</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-auto p-5 flex flex-col justify-center items-center mb-[2em]">
        <div className="flex flex-wrap justify-center items-center gap-3">
          <button onClick={() => setActiveTab(0)}>Eligible</button>
          <button onClick={() => setActiveTab(1)}>All</button>
          <button onClick={() => setActiveTab(2)}>Completed</button>
        </div>
        <div>
          {activeTab === 0 && <EligibleContent />}
          {activeTab === 1 && <AllContent />}
          {activeTab === 2 && <CompletedContent />}
        </div>
      </div>
    </>
  )
}

export default Rewards
