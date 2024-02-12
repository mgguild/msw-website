import {FC} from "react"
import {Link} from "react-router-dom"
import Logo from "../../../Assets/img/MSW_Logo_header2.png"

const Navigation: FC = () => {
  return (
    <nav className="w-full">
      <div className="flex flex-wrap justify-between items-center bg-[#0F1637] px-[5em] py-[1em]">
        <div>
          <img src={Logo} width={122} alt="MetaSaga Warriors logo" />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-[50px] text-[18px] text-[#999999]">
          {/* <Link to="/dashboard" className="hover:text-white">Home</Link> */}
          <Link to="/dashboard/rewards" className="hover:text-white">Rewards</Link>
          <Link to="/dashboard/wallet" className="hover:text-white">Wallet</Link>
          <Link to="/dashboard/exchange" className="hover:text-white">Exchange</Link>
          <Link to="/dashboard/membership" className="hover:text-white">Membership</Link>
          <Link to="/dashboard/social" className="hover:text-white">Social</Link>
          <Link to="/dashboard/guilds" className="hover:text-white">Guilds</Link>
          <Link to="/dashboard/leaderboards" className="hover:text-white">Leaderboards</Link>
          <p className="cursor-pointer text-[#FFB800]">Login</p>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
