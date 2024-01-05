import {FC} from "react"

const Rewards: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
        <p className="font-bold text-[48px]">Welcome, Username!</p>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-[131px] p-5 flex flex-wrap justify-center items-center mb-[2em]">
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="flex flex-wrap justify-between items-center w-full">
        <div className="bg-[#0F1637] rounded-[5px] w-[48%] h-[406px] p-5 flex flex-wrap justify-center items-start">
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div className="bg-[#0F1637] rounded-[5px] w-[48%] h-[406px] p-5 flex flex-wrap justify-center items-start">
          <p>Lorem ipsum dolor sit amet</p>
        </div>
      </div>
    </>
  )
}

export default Rewards
