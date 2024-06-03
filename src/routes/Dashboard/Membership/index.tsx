import {FC, useEffect, useState} from "react"
import styled from "styled-components";
import mgg from "../../../Assets/0xFc2dAfe72A1a893363CdE3c18E6C2159De7B7830.png"
import { Web3Button, useAddress, SmartContract } from "@thirdweb-dev/react";
import { BaseContract } from "ethers";
import { BigNumber } from "ethers";
import usePlayfab from "../../../Hooks/usePlayfab";
import { useAppDispatch } from "../../../Components/Marketplace/state";
import { useGetUser } from "../../../Components/Marketplace/state/hooks";
import { getMembershipT1, getMembershipT2, getMembershipT3 } from "../../../Components/Marketplace/state/playfab/playfab";
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import moment from "moment";

const ABI = [{"inputs":[{"internalType":"string","name":"tokenName_","type":"string"},{"internalType":"string","name":"tokenSymbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"address","name":"chainportCongress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"}],"name":"AddressBlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"}],"name":"AddressUnblocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BlackFundsDestroyed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"}],"name":"ChainportBridgeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"}],"name":"ChainportCongressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"StuckTokenWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressToBlock","type":"address"}],"name":"blockAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"chainportBridge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chainportCongress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"maliciousAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"destroyBlackFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isBlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_chainportCongress","type":"address"}],"name":"setChainportCongress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_chainportBridge","type":"address"}],"name":"setSideBridgeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressToUnblock","type":"address"}],"name":"unblockAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"beneficiary","type":"address"}],"name":"withdrawTokenIfStuck","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const ABIMembership = [{"inputs":[{"internalType":"address","name":"_mggTokenAddress","type":"address"},{"internalType":"address","name":"_recipientAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"tier","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyMembership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mggTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recipientAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tierOnePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierThreePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierTwoPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mggTokenAddress","type":"address"}],"name":"updateMggTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipientAddress","type":"address"}],"name":"updateMggTokenReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tierOnePrice","type":"uint256"},{"internalType":"uint256","name":"_tierTwoPrice","type":"uint256"},{"internalType":"uint256","name":"_tierThreePrice","type":"uint256"}],"name":"updateTierPrices","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const NdUsrBtn = styled.button`
  padding: 1rem;
  background-color: grey;
`

const Membership: FC = () => {
  const dispatch = useAppDispatch();
  const user = usePlayfab((state: any) => state.user);
  const pfUser = useGetUser();
  const userData = usePlayfab((state: any) => state.userData);
  const _address = useAddress();
  const [_userData, setUserData] = useState<null | any>(null);

  useEffect(() => {
    setUserData(userData);
  },[userData, pfUser])

  const [firstStepSuccess, setFirstStepSuccess] = useState<number>(0)
  const [selectedTier, setSelectedTier] = useState<number>(0)
  const [cntrctLoding, setCntrctLoading] = useState<boolean>(false)
  const [secondStepSuccess, setSecondStepSuccess] = useState<boolean>(false)

  const handleFirstStep = async (contract: SmartContract<BaseContract>, tier: number, price: string) => {
    setSelectedTier(tier)
    if(!_userData['WalletAddress']){
      toast.warn('User needs to bind a wallet account');
      return;
    }
    if(`${_userData['WalletAddress'].Value}`.toUpperCase() !== `${_address}`.toUpperCase()){
      toast.warn('Connected wallet must be same with bound wallet. Please switch wallet account that is bound to user');
      return;
    }

    setCntrctLoading(true);
    var ctrqReq: any = null;
    await contract.call("approve", ["0x7F8d5a597d03b6a1e6f6578c333522707E29C168", BigNumber.from(price)]).then((res) => {
      ctrqReq = res;
    }).catch((e) => {
      console.log(e);
    });

    if(ctrqReq && ctrqReq.receipt.status){
      setFirstStepSuccess(tier);
      toast.success('Contract approved!');
    }else{
      toast.error('Somthing went wrong');
    }
    setCntrctLoading(false);
  }

  const handleSecondStep = async (contract: SmartContract<BaseContract>, tier: number, price: string) => {
    var ctrqReq: any = null;
    await contract.call("buyMembership", [tier, BigNumber.from(price)]).then((res) => {
      ctrqReq = res;
    }).catch((e) => {
      console.log(e);
    });

    setCntrctLoading(true);

    if(ctrqReq.receipt.status){
      switch (tier) {
        case 1:
          await dispatch(getMembershipT1({playerId: user.PlayFabId, transc: ctrqReq.receipt.transactionHash}));
        break;

        case 2:
          await dispatch(getMembershipT2({playerId: user.PlayFabId, transc: ctrqReq.receipt.transactionHash}));
        break;

        case 3:
          await dispatch(getMembershipT3({playerId: user.PlayFabId, transc: ctrqReq.receipt.transactionHash}));
        break;

        default:
          toast.error("Wrong call tier")
        break;
      }
      toast.success('You are now a member');
      setSecondStepSuccess(true);
    }else{
      toast.error('Something went wrong');
    }
    setCntrctLoading(false);
  }

  const handleError = (error: any) => {
    setCntrctLoading(false);
    console.error(error)
  }


  return (
    <>
    <div className="w-full text-center">
    </div>
    {/* todo */}
      <div className="text-center">
        <p className="text-[48px] uppercase">Membership</p>
      </div>
      { user &&
        <div className="bg-[#0F1637] rounded-[5px] p-5 my-[2em]">
          <div className="flex flex-wrap justify-around items-center w-full">
            <div>
              <p>Premium Membership: &nbsp;
                { pfUser.mggMembership && pfUser.mggMembership?.transcHash !== ""  ?
                  <>
                  { pfUser.mggMembership?.dateData[1] <= Date.now() ?
                    <span className="text-[#ff6200]">Expired</span>
                    :
                    <span className="text-[#00FF3C]">Active</span>
                  }
                  </>
                  :
                  <span className="text-[#ff0000]">Non-Active</span>
                }

              </p>
            </div>
            { pfUser.mggMembership?.dateData[0] &&
              <div>
                <p>Expires On: <span>{moment.unix(pfUser.mggMembership.dateData[1]/1000).format("LL")}</span></p>
              </div>
            }
          </div>
        </div>
      }
      <div className="bg-[#0F1637] rounded-[5px] p-5 pb-[5em] my-[2em] text-center">
        <div>
          <p className="text-[28px] mb-[1em] uppercase">Pricing</p>
          <div className="flex flex-wrap justify-between items-center">
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em] flex flex-col justify-center items-center gap-3">
              <b className="font-black text-[24px]">3 Months</b>
              <div className="flex flex-wrap justify-center items-center gap-3">
                  <img src={mgg} alt="mgg logo" width={70} height={80} />
                  <b className="text-[32px] font-black">9235.22 MGG</b>
              </div>
              <div id="initial-button"></div>
              {!user &&
                <NdUsrBtn disabled>Need user login</NdUsrBtn>
              }
                  {firstStepSuccess === 0 && user && (
                    <Web3Button
                      contractAddress={"0x6125aDCAb2F171BC70cfe2CAeCFeC5509273A86A"}
                      contractAbi={ABI}
                      action={(contract) => {
                        handleFirstStep(contract, 1, "9235220000000000000000");
                      }}
                      onError={(e) => console.error(e)}
                      isDisabled={cntrctLoding}
                    >
                      <b>
                    {(cntrctLoding && selectedTier === 1)  ?
                      <>
                        <Blocks
                          height="20"
                          color="#000000"
                          ariaLabel="tailspin-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </>
                      :
                      <>
                        Approve Contract
                      </>
                    }
                  </b>
                    </Web3Button>
                  )}

                  {firstStepSuccess === 1 && user && !secondStepSuccess && (
                      <Web3Button
                        contractAddress={"0x7F8d5a597d03b6a1e6f6578c333522707E29C168"}
                        contractAbi={ABIMembership}
                        action={(contract) => {
                          handleSecondStep(contract, 1, "9235220000000000000000");
                        }}
                        onError={(e) => console.error(e)}
                        onSuccess={(e) => {}}
                        isDisabled={cntrctLoding}
                      >
                        <b>
                    {cntrctLoding ?
                      <>
                        <Blocks
                          height="20"
                          color="#000000"
                          ariaLabel="tailspin-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </>
                      :
                      <>
                        {pfUser.mggMembership?.tier !== '' ?
                          <>
                            Extend membership
                          </>
                          :
                          <>
                            Buy Membership
                          </>
                        }
                      </>
                    }
                    </b>
                      </Web3Button>
                  )}
            </div>
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em] flex flex-col justify-center items-center gap-3">
              <b className="font-black text-[24px]">6 Months</b>
              <div className="flex flex-wrap justify-center items-center gap-3">
                  <img src={mgg} alt="mgg logo" width={70} height={80} />
                  <b className="text-[32px] font-black">16632.09 MGG</b>
              </div>
                {!user &&
                  <NdUsrBtn disabled>Need user login</NdUsrBtn>
                }
                {firstStepSuccess === 0 && user && (
                  <Web3Button
                    contractAddress={"0x6125aDCAb2F171BC70cfe2CAeCFeC5509273A86A"}
                    contractAbi={ABI}
                    action={(cntrct) => {handleFirstStep(cntrct, 2, "16632090000000000000000")}}
                    onError={(e) => handleError(e)}
                    isDisabled={cntrctLoding}
                  >
                    <b>
                    {(cntrctLoding && selectedTier === 2) ?
                      <>
                        <Blocks
                          height="20"
                          color="#000000"
                          ariaLabel="tailspin-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </>
                      :
                      <>
                        Approve Contract
                      </>
                    }
                    </b>
                  </Web3Button>
                )}

                {firstStepSuccess === 2 && user && !secondStepSuccess && (
                  <Web3Button
                    contractAddress={"0x7F8d5a597d03b6a1e6f6578c333522707E29C168"}
                    contractAbi={ABIMembership}
                    action={(cntrct => {handleSecondStep(cntrct, 2, "16632090000000000000000")})}
                    onError={(e) => handleError(e)}
                    onSuccess={(e) => {}}
                    isDisabled={cntrctLoding}
                  >
                    <b>
                    {cntrctLoding ?
                      <>
                        <Blocks
                          height="20"
                          color="#000000"
                          ariaLabel="tailspin-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </>
                      :
                      <>
                        {pfUser.mggMembership?.tier !== '' ?
                          <>
                            Extend membership
                          </>
                          :
                          <>
                            Buy Membership
                          </>
                        }
                      </>
                    }
                    </b>
                  </Web3Button>
                )}
            </div>
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em] flex flex-col justify-center items-center gap-3">
              <b className="font-black text-[24px]">12 Months</b>
              <div className="flex flex-wrap justify-center items-center gap-3">
                  <img src={mgg} alt="mgg logo" width={70} height={80} />
                  <b className="text-[32px] font-black">23147.32 MGG</b>
              </div>
                {!user &&
                  <NdUsrBtn disabled>Need user login</NdUsrBtn>
                }
                {firstStepSuccess === 0 && user && (
                  <Web3Button
                    contractAddress={"0x6125aDCAb2F171BC70cfe2CAeCFeC5509273A86A"}
                    contractAbi={ABI}
                    action={(cntrct) => {handleFirstStep(cntrct, 3, "23147320000000000000000")}}
                    onError={(e) => handleError(e)}
                    isDisabled={cntrctLoding}
                  >
                    <b>
                    {(cntrctLoding && selectedTier === 3) ?
                      <>
                        <Blocks
                          height="20"
                          color="#000000"
                          ariaLabel="tailspin-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </>
                      :
                      <>
                        Approve Contract
                      </>
                    }
                    </b>
                  </Web3Button>
                )}

                {firstStepSuccess === 3 && user && !secondStepSuccess && (
                  <Web3Button
                    contractAddress={"0x7F8d5a597d03b6a1e6f6578c333522707E29C168"}
                    contractAbi={ABIMembership}
                    action={(cntrct => {handleSecondStep(cntrct, 3, "23147320000000000000000")})}
                    onError={(e) => handleError(e)}
                    onSuccess={(e) => {}}
                    isDisabled={cntrctLoding}
                  >
                    <b>
                    {cntrctLoding ?
                      <>
                        <Blocks
                          height="20"
                          color="#000000"
                          ariaLabel="tailspin-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </>
                      :
                      <>
                        {pfUser.mggMembership?.tier !== '' ?
                          <>
                            Extend membership
                          </>
                          :
                          <>
                            Buy Membership
                          </>
                        }
                      </>
                    }
                    </b>
                  </Web3Button>
                )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-[28px] mb-[1em] mt-5 uppercase">How To Obtain Premium Membership</p>
          <ol className="bg-[#19297F] rounded-[5px] w-full p-5 flex flex-col justify-center items-center gap-1 list-decimal">
            <li>Buy MGG on <a href="https://sparkswap.finance/" target="_blank" rel="noreferrer">SparkSwap</a> or <a href="https://pancakeswap.finance/" target="_blank" rel="noreferrer">PancakeSwap</a></li>
            <li>Buy premium membership here</li>
            <li>After buying, your premium membership status will be set to Active</li>
            <li>Log into MetaSaga Warriors Game</li>
            <li>Enjoy premium membership perks in game</li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default Membership;
