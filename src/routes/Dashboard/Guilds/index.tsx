import {FC, useState} from "react"
import { Button } from "../../../Components/Dashboard"
import Logo from "../../../Assets/img/discord_logo.png"

const Guilds: FC = () => {
  return (
    <>
      <div>
      
        <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
        <p className="font-bold text-[48px]">Guilds</p>
        <p>Lorem ipsum dolor sit amet, consectetur sodipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
        </div>  
        <div className="flex flex-col justify-center items-center">
            <Button value="Create Guild" />
        </div>
        <div className="bg-[#0F1637] rounded-[5px] w-full p-5 my-[2em] gap-5">
          <p className="uppercase text-[48px] font-bold text-center ">All GUILDS</p>
          <p className="text-center my-4">Lorem ipsum dolor sit amet, consectetur sodipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
          <div className="flex flex-wrap justify-start items-center gap-5">

            <div className="flex flex-wrap justify-between items-center w-full">
              
              <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-5 flex flex-wrap justify-center items-start">
                <p>Guild</p>
              </div>
              
              <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-5 flex flex-wrap justify-center items-start">
                <p>Watchers</p>
              </div>
              
              <div className="line justify-center"></div>

              <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Logo} width={122} alt="MetaSaga Warriors logo" style={{ marginRight: '10px' }} />
                  <div>
                    <p>Lorem Ipsum</p>
                    <p>@loremipsum</p>
                  </div>
                </div>
              </div>
            
              <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <p>1234</p>
                  </div>
                </div>
              </div>
          
              <div className="flex flex-col justify-center items-center gap-5 w-[50%] ">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Logo} width={122} alt="MetaSaga Warriors logo" style={{ marginRight: '10px' }} />
                  <div>
                    <p>Lorem Ipsum</p>
                    <p>@loremipsum</p>
                  </div>
                </div>
              </div>
            
              <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <p>564</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Logo} width={122} alt="MetaSaga Warriors logo" style={{ marginRight: '10px' }} />
                  <div>
                    <p>Lorem Ipsum</p>
                    <p>@loremipsum</p>
                  </div>
                </div>
              </div>
            
              <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <p>564</p>
                  </div>
                </div>
              </div>
          

            </div>


          </div>
          
        </div>
      </div>
     
    </>
  )
}

export default Guilds

     
   
 
