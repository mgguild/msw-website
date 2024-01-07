import {FC} from "react"
import { Button } from "../../../Components/Dashboard"

const Social: FC = () => {
  return (
    <>
      <div className="text-center mb-[2em]">
        <p className="text-[48px] uppercase">Connect Socials</p>
      </div>
      <div className="flex flex-wrap justify-center items-stretch gap-5">
        <div className="bg-[#0F1637] rounded-[5px] p-[2em] w-[60%]">
          <div className="text-center my-[2em]">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In atque consectetur necessitatibus minus eius. Sed quia nihil deserunt sit, voluptatem, vitae, praesentium aliquid impedit fuga rem dolores corrupti quaerat natus.</p>
          </div>
          <div className="bg-[#19297F] rounded-[5px] py-[2em] flex flex-wrap justify-center items-center gap-5">
            <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
              <div className="flex flex-wrap justify-center items-center gap-5">
                <p>Logo</p>
                <p>Not Connected</p>
              </div>
              <div>
                <Button value="Connect" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
              <div className="flex flex-wrap justify-center items-center gap-5">
                <p>Logo</p>
                <p>Not Connected</p>
              </div>
              <div>
                <Button value="Connect" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
              <div className="flex flex-wrap justify-center items-center gap-5">
                <p>Logo</p>
                <p>Not Connected</p>
              </div>
              <div>
                <Button value="Connect" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
              <div className="flex flex-wrap justify-center items-center gap-5">
                <p>Logo</p>
                <p>test@gmail.com</p>
              </div>
              <div>
                <Button value="Change" secondary />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] bg-[#0F1637] rounded-[5px] p-[2em] flex flex-col gap-[1em] justify-start items-center text-center">
          <div>
            <p className="text-[36px] uppercase">Account Deletion</p>
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet, consetetur sodipscing elitr?</p>
          </div>
          <div>
            <Button value="Delete Account" secondary />
          </div>
        </div>
      </div>
    </>
  )
}

export default Social