import {FC} from "react"
import { ConnectWallet } from "@thirdweb-dev/react"
import usePlayfab from "../../../Hooks/usePlayfab"

const Wallet: FC = () => {
  const user = usePlayfab((state: any) => state.user)
  console.log(user)

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
        <p className="text-[36px] font-bold">Crypto Wallet</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] w-full h-auto p-5 flex flex-col justify-center items-center mb-[2em] gap-3">
        <div>
          <p>Email: {user?.PrivateInfo?.Email || "email@address.com"}</p>
        </div>
        <ConnectWallet
          theme="dark"
          switchToActiveChain={true}
          auth={{
            loginOptional: false,
          }}
        />
      </div>
    </>
  )
}

export default Wallet