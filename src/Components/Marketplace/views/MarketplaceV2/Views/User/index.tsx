import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import { TextWrapper } from '../../components/Foundation/Text'
import withGridLayout from './withGridLayout'
import Main from '../Main'
import UserMain from './Usermain'
import NftCollection from './NftCollection'
import NeedCreds from '../../../../../Modals/NeedCreds'
import './UserStyle.css'
import usePlayfab from '../../../../../../Hooks/usePlayfab'
import { useSDK, useWatchTransactions } from "@thirdweb-dev/react"

// Tempdata collection

const tempActivityData = [
    {
        date: '2023.07.27',
        status: 'Success',
        tx: 'Buy',
        amount: '102.00',
        type: 'Market Money',
    },
    {
        date: '2023.07.27',
        status: 'Fail',
        tx: 'Buy',
        amount: '102.00',
        type: 'Market Money',
    },
];

const tempTx = {
    coin: [
        {
            date: '2023.07.27',
            status: 'Success',
            tx: 'Buy',
            amount: '102.00',
            type: 'Market Money',
        },
    ],
    nft: [
        {
            date: '2023.07.27',
            status: 'Success',
            tx: 'Buy',
            amount: '102.00',
            type: 'Market Money',
        },
        {
            date: '2023.07.27',
            status: 'Fail',
            tx: 'Buy',
            amount: '102.00',
            type: 'Market Money',
        },
    ],
};

// Tempdata collection -- end

const WrappedMain = withGridLayout(UserMain)
const WrappedNftList = withGridLayout(NftCollection)

const userData = {
  email: 'email.add@mgg.com',
  wallet: "0x0000",
}

type TWalletData = {
  balance: number
}

const walletData: TWalletData = {
  balance: 0
}

const User = () => {
  const sdk = useSDK()
  const currentUser = usePlayfab((state: any) => state.user);
  const [active, setActive] = useState(0)
  // TODO: Replace with actual data
  const [userInfo, setUserInfo] = useState(userData)
  const [walletInfo, setWalletInfo] = useState(walletData)
  const handleUserInfo = (payload: { field: string, value: string }) => {
    setUserInfo({ ...userInfo, [`${payload.field}`]: payload.value })
    console.log(userInfo)
  }

  useEffect(() => {
      const fetchWalletData = async () => {
        const walletAddress = await sdk?.wallet?.getAddress()
        const walletBalance = await sdk?.wallet?.balance()

        setWalletInfo({
          balance: Number(walletBalance) || 0
        })

        setUserInfo((prev) => ({
          ...prev,
          wallet: walletAddress || "0x0000"
        }))
      }

      fetchWalletData()

      setUserInfo((prev) => ({
        ...prev,
        email: currentUser?.PrivateInfo?.Email || "email.add@mgg.com",
      }))
  }, [currentUser, sdk])

  return (
    <div style={{width: '100%'}}>
      <NeedCreds
        wallet={true}
        walletConnect={true}
        sameWallet={false}
      />
      <Main>
        <div>
          <b className="text-[48px] bg-gradient-to-b from-[#4ED2FB] to-[#6B3CD3] bg-clip-text text-transparent font-black">PROFILE</b>
        </div>
        <TextWrapper>
          <StyledDiv>
            <Grid container spacing={5}>
              <WrappedMain
                {...{
                  mediaQ: { xs: 12, md: 6, lg: 5 },
                  tabController: { active, setActive },
                  txHistory: { ...tempTx },
                  activityHistory: tempActivityData,
                  userInfo,
                  handleFunctions: { handleUserInfo },
                  walletInfo
                }}
              />
              <WrappedNftList {...{ mediaQ: { xs: 12, md: 6, lg: 7 } }} />
            </Grid>
          </StyledDiv>
        </TextWrapper>
      </Main>
    </div>
  )
}

export default User;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    padding: 15px 0px;
`;
