import {FC} from "react"

const Membership: FC = () => {
  return (
    <>
      <div className="text-center">
        <p className="text-[48px] uppercase">Membership</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] p-5 pb-[5em] my-[2em] text-center">
        <div>
          <p className="text-[28px] mb-[1em] mt-[2em] uppercase">Perks</p>
          <div className="bg-[#19297F] rounded-[5px] w-full p-5 flex flex-col justify-center items-center gap-5">
            <p>Lorem ipsum dolor sit amet</p>
            <p>Lorem ipsum dolor sit amet</p>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div>
          <p className="text-[28px] mb-[1em] mt-[2em] uppercase">How To Obtain VIP</p>
          <ol className="bg-[#19297F] rounded-[5px] w-full p-5 flex flex-col justify-center items-center gap-5 list-decimal">
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Lorem ipsum dolor sit amet</li>
          </ol>
        </div>
        <div>
          <p className="text-[28px] mb-[1em] mt-[2em] uppercase">Pricing</p>
          <div className="flex flex-wrap justify-between items-center">
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em]">
              <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="bg-[#7900FF] rounded-[5px] w-[30%] py-[3em]">
              <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em]">
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Membership