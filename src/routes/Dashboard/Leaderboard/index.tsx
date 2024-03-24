import {FC, useState, useEffect} from "react"
import Logo from "../../../Assets/img/discord_logo.png"
import usePlayfab from "../../../Hooks/usePlayfab"

const Leaderboard: FC = () => {
  const getLeaderboard = usePlayfab((state: any) => state.getLeaderboard)
  const leaderboard = usePlayfab((state: any) => state.leaderboard)
  console.log('---')
  console.log(leaderboard)

  useEffect(() => {
    getLeaderboard()
  }, [getLeaderboard])
  return (
    <>
      <div>
      
        <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
        <p className="font-bold text-[48px]">Leaderboard</p>
        <p>Lorem ipsum dolor sit amet, consectetur sodipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
        </div>  
    
        <div className="bg-[#0F1637] rounded-[5px] w-full p-5 my-[2em] gap-5">
          <p className="uppercase text-[48px] font-bold text-center ">Top scorers</p>
        
          <div className="flex flex-wrap justify-start items-center gap-5">

            <div className="flex flex-wrap justify-between items-center w-full">
              
              <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-5 flex flex-wrap justify-center items-start">
                <p>Player Name</p>
              </div>
              
              <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-5 flex flex-wrap justify-center items-start">
                <p>Score</p>
              </div>
              
              <div className="line justify-center"></div>

              <div className="fle flex-col justify-center items-center gap-2 w-full">
                {leaderboard.map((data: any) => (
                  <>
                    <div className="flex flex-wrap justify-between items-center gap-5">
                      <p>{data?.DisplayName}</p>
                      <p>{data?.StatValue}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>


          </div>
          
        </div>
      </div>
     
    </>
  )
}

export default Leaderboard

     
   
 

