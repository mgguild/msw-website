import {FC, useState} from "react"
import {Link} from "react-router-dom"
import Logo from "../../../Assets/img/MSW_Logo_header2.png"
import usePlayfab from "../../../Hooks/usePlayfab"
import { LoginRegister, UserDashboard } from "../../Modals"

const Navigation: FC = () => {
  const user = usePlayfab((state: any) => state.user)
  const [activeTab, setActiveTab] = useState<string>("rewards")

  return (
    <nav className="w-full">
      <div className="flex flex-wrap justify-between items-center bg-[#0F1637] px-[5em] py-[1em]">
        <Link to="/">
          <img src={Logo} width={122} alt="MetaSaga Warriors logo" />
        </Link>
        <div className="flex flex-wrap justify-center items-center gap-[50px] text-[18px] text-[#999999]">
          {/* <Link to="/dashboard" className="hover:text-white">Home</Link> */}
          <Link to="/dashboard/rewards" onClick={() => setActiveTab("rewards")} className={`${activeTab === "rewards" && "text-white"} hover:text-white`}>Rewards</Link>
          <Link to="/dashboard/wallet" onClick={() => setActiveTab("wallet")} className={`${activeTab === "wallet" && "text-white"} hover:text-white`}>Wallet</Link>
          <Link to="/dashboard/exchange" onClick={() => setActiveTab("exchange")} className={`${activeTab === "exchange" && "text-white"} hover:text-white`}>Exchange</Link>
          <Link to="/dashboard/membership" onClick={() => setActiveTab("membership")} className={`${activeTab === "membership" && "text-white"} hover:text-white`}>Membership</Link>
          <Link to="/dashboard/social" onClick={() => setActiveTab("social")} className={`${activeTab === "social" && "text-white"} hover:text-white`}>Social</Link>
          {/* <Link to="/dashboard/guilds" className="hover:text-white">Guilds</Link> */}
          <Link to="/dashboard/leaderboards" onClick={() => setActiveTab("leaderboards")} className={`${activeTab === "leaderboards" && "text-white"} hover:text-white`}>Leaderboards</Link>
          <div>
            {user ? <UserDashboard /> : <LoginRegister />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
