import {FC, useEffect, useState} from "react"
import styled from "styled-components";
import mgg from "../../../Assets/0xFc2dAfe72A1a893363CdE3c18E6C2159De7B7830.png"
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import usePlayfab from "../../../Hooks/usePlayfab";
import { useAppDispatch } from "../../../Components/Marketplace/state";
import { useGetUser } from "../../../Components/Marketplace/state/hooks";
import { getMembershipT1 } from "../../../Components/Marketplace/state/playfab/playfab";
import { toast } from 'react-toastify';
import moment from "moment";

const ABI = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"retrieveLostTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
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

  const [firstStepSuccess, setFirstStepSuccess] = useState<boolean>(false)
  const [secondStepSuccess, setSecondStepSuccess] = useState<boolean>(false)
  const handleFirstStep = async (contract:  any, price: string) => {
    if(!_userData['WalletAddress']){
      toast.warn('User needs to bind a wallet account');
      return;
    }
    /*
    if(`${_userData['WalletAddress'].Value}`.toUpperCase() !== `${_address}`.toUpperCase()){
      toast.warn('Connected wallet must be same with bound wallet. Please switch wallet account that is bound to user');
      return;
    }
    */

    var ctrqReq = await contract.call("approve", ["0xE92A44a9a8F421885666ec566435726E7Ab21b0e", BigNumber.from("1000000000000000000")]);
    if(ctrqReq.receipt.status){
      setFirstStepSuccess(true);
    }else{
      toast.success('Somthing went wrong');
    }
  }

  const handleSecondStep = async (contract: any, tier: number, price: string) => {
    var ctrqReq = await contract.call("buyMembership", [tier, BigNumber.from(price)]);

    if(ctrqReq.receipt.status){
      await dispatch(getMembershipT1({playerId: user.PlayFabId, transc: ctrqReq.receipt.transactionHash}));
      toast.success('You are now a member');
    }else{
      toast.success('Somthing went wrong');
    }
  }


  return (
    <>
    <div className="w-full text-center">
    </div>
    {/* todo */}
      <div className="text-center">
        <p className="text-[48px] uppercase">Membership</p>
      </div>
      <div className="bg-[#0F1637] rounded-[5px] p-5 my-[2em]">
        <div className="flex flex-wrap justify-around items-center w-full">
          <div>
            { pfUser.mggMembership ?
              <p>Premium Membership: <span className="text-[#00FF3C]">Active</span></p>
              :
              <p>Premium Membership: <span className="text-[#ff0000]">NonActive</span></p>
            }
          </div>
          { pfUser.mggMembership?.dateData[0] &&
            <div>
              <p>Expires On: <span>{moment.unix(pfUser.mggMembership.dateData[1]/1000).format("LL")}</span></p>
            </div>
          }
        </div>
      </div>
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
              {pfUser.mggMembership?.tier === 'tier1' ? <></>
                :
                <>
                  {!firstStepSuccess && user && (
                    <Web3Button
                      contractAddress={"0xb67F3922042B8c4546DFD9E55C1E55CaC7aE1F3f"}
                      contractAbi={ABI}
                      action={(contract) => {
                        handleFirstStep(contract, "1000000000000000000");
                      }}
                      onError={(e) => console.error(e)}
                    >
                      <b>Approve Contract</b>
                    </Web3Button>
                  )}

                  {firstStepSuccess && user && !secondStepSuccess && (
                      <Web3Button
                        contractAddress={"0xE92A44a9a8F421885666ec566435726E7Ab21b0e"}
                        contractAbi={ABIMembership}
                        action={(contract) => {
                          handleSecondStep(contract, 1, "1000000000000000000");
                        }}
                        onError={(e) => console.error(e)}
                        onSuccess={(e) => setSecondStepSuccess(true)}
                      >
                        <b>Buy Membership</b>
                      </Web3Button>
                  )}
                </>
              }
            </div>
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em] flex flex-col justify-center items-center gap-3">
              <b className="font-black text-[24px]">6 Months</b>
              <div className="flex flex-wrap justify-center items-center gap-3">
                  <img src={mgg} alt="mgg logo" width={70} height={80} />
                  <b className="text-[32px] font-black">16632.09 MGG</b>
              </div>
              <div id="initial-button"></div>
              {!user &&
                <NdUsrBtn disabled>Need user login</NdUsrBtn>
              }
              {pfUser.mggMembership?.tier === 'tier2' ? <></>
                :
                <>
                  {!firstStepSuccess && user && (
                    <Web3Button
                      contractAddress={"0xb67F3922042B8c4546DFD9E55C1E55CaC7aE1F3f"}
                      contractAbi={ABI}
                      action={(contract) => {
                        handleFirstStep(contract, "1000000000000000000");
                      }}
                      onError={(e) => console.error(e)}
                    >
                      <b>Approve Contract</b>
                    </Web3Button>
                  )}

                  {firstStepSuccess && user && !secondStepSuccess && (
                      <Web3Button
                        contractAddress={"0xE92A44a9a8F421885666ec566435726E7Ab21b0e"}
                        contractAbi={ABIMembership}
                        action={(contract) => {
                          handleSecondStep(contract, 2, "2000000000000000000")
                        }}
                        onError={(e) => console.error(e)}
                        onSuccess={(e) => setSecondStepSuccess(true)}
                      >
                        <b>Buy Membership</b>
                      </Web3Button>
                  )}
                </>
              }
            </div>
            <div className="bg-[#19297F] rounded-[5px] w-[30%] py-[3em] flex flex-col justify-center items-center gap-3">
              <b className="font-black text-[24px]">12 Months</b>
              <div className="flex flex-wrap justify-center items-center gap-3">
                  <img src={mgg} alt="mgg logo" width={70} height={80} />
                  <b className="text-[32px] font-black">23147.32 MGG</b>
              </div>
              <div id="initial-button"></div>
              {!user &&
                <NdUsrBtn disabled>Need user login</NdUsrBtn>
              }
              {pfUser.mggMembership?.tier === 'tier3' ? <></>
                :
                <>
                  {!firstStepSuccess && user && (
                    <Web3Button
                      contractAddress={"0xb67F3922042B8c4546DFD9E55C1E55CaC7aE1F3f"}
                      contractAbi={ABI}
                      action={(contract) => {
                        handleFirstStep(contract, "1000000000000000000");
                      }}
                      onError={(e) => console.error(e)}
                    >
                      <b>Approve Contract</b>
                    </Web3Button>
                  )}

                  {firstStepSuccess && user && !secondStepSuccess && (
                      <Web3Button
                        contractAddress={"0xE92A44a9a8F421885666ec566435726E7Ab21b0e"}
                        contractAbi={ABIMembership}
                        action={(contract) => {
                          handleSecondStep(contract, 3, "3000000000000000000")
                        }}
                        onError={(e) => console.error(e)}
                        onSuccess={(e) => setSecondStepSuccess(true)}
                      >
                        <b>Buy Membership</b>
                      </Web3Button>
                  )}
                </>
              }
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
