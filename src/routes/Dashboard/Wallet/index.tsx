import {FC} from "react"
import { ConnectWallet } from "@thirdweb-dev/react"
import usePlayfab from "../../../Hooks/usePlayfab"

const Wallet: FC = () => {
  const user = usePlayfab((state: any) => state.user)
  console.log(user)

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-2">
        <p className="text-[36px] font-bold uppercase">Crypto Wallets</p>
        <p>Binded email and wallet address</p>
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
          className="bg-[#FFB800] text-white uppercase skew-x-[-6deg] rounded-[5px]"
        />
      </div>
    </>
  )
}

export default Wallet