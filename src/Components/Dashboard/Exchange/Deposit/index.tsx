import {FC} from "react"
import Button from "../../Button"

const Deposit: FC = () => {
  return (
    <>
      <div className="py-5">
        <div className="flex flex-col gap-5">
          <p>No Pending Deposit Transaction</p>
          <p>Lorem ipsum dolor sit amet</p>
          <div className="bg-[#19297F] rounded-[5px] p-5 my-[2em]">
            <p className="mb-[1em]">Missing transaction? Input transaction hash here to try verifying again:</p>
            <Button value="verify" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Deposit