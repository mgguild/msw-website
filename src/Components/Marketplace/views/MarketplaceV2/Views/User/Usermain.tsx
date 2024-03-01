import React, { useState, useEffect } from 'react'
import { Flex, IconButton } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material'
import Iconloader from '../../components/Foundation/Iconloader'
import MarketPlaceButton from '../../components/Foundation/Button'
import BasicTooltip from '../../components/Foundation/Tooltip'
import { H2, H3, H5, P, TextWrapper } from '../../components/Foundation/Text'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import { MiniBox } from '../../components/Foundation/Box'
import { FIELD_INFO } from './index.d'
import { ActionDiv, Button, ContentWrapper, NavButton, NavDiv, StyledBox } from './styled'
import Cointable from './Cointable'
import Table from './Table'
import TxTab from './TxTab'

const UserMain = (props: any) => {
  const {
    controllers: { modal },
  } = useMarketplaceV2()

  const {
    txHistory: { coin, nft },
    activityHistory,
    userInfo,
    tabController: { active },
    handleFunctions: { handleUserInfo },
    walletInfo
  } = props
  const txD = React.useMemo(() => (active === 0 ? coin : nft), [active, coin, nft])
  const [enableEdit, setEnableEdit] = useState<boolean>(false)
  const handleEdit = () => {
    setEnableEdit(!enableEdit)
  }
  const boxInfo = (name: string, tooltip: string) => {
    return (
      <Flex alignItems="center" justifyContent="space-between">
        <H2 fsize="1.2em">{name}</H2>
        <Flex justifyContent="space-between" flex="0.2" alignItems="center">
          <IconButton variant="text" className="icon-button">
            <MiniBox m="0">
              <Iconloader type="fa" name="Redo" fontSize="1em" />
            </MiniBox>
          </IconButton>
          <BasicTooltip title={tooltip}>
            <MiniBox m="0" style={{ height: '50%' }}>
              <Iconloader type="fa" name="InfoCircle" fontSize="1em" />
            </MiniBox>
          </BasicTooltip>
        </Flex>
      </Flex>
    )
  }

  const renderInfo = () => {
    return (
      <StyledBox p="1em">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              {Object.entries(userInfo).map((info: any) => {
                const field = FIELD_INFO[info[0] as keyof typeof FIELD_INFO]
                const val = info[1].toString()
                return (
                  <>
                    <Grid item xs={5} sm={5}>
                      <H5 fsize="0.9em">{field}:</H5>
                    </Grid>
                    <Grid item xs={7} sm={7}>
                      {enableEdit ? (
                        <input
                          className='user-input'
                          value={val}
                          onChange={(e) => handleUserInfo({ field: info[0], value: e.target.value })}
                        />
                      ) : (
                        <P fsize="0.9em">{val}</P>
                      )}
                    </Grid>
                  </>
                )
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2} display="flex" alignItems="center" justifyContent="center">
            <IconButton variant="text" className="icon-button" onClick={handleEdit}>
              <MiniBox>
                <Iconloader type="fa" name="Edit" fontSize="1em" />
              </MiniBox>
            </IconButton>
          </Grid>
        </Grid>
      </StyledBox>
    )
  }

  const renderPoint = () => {
    return (
      <StyledBox p="1em">
        {boxInfo('point', 'Access point')}
        <Grid container columnSpacing={{ xs: 2, md: 5 }} mt={2}>
          <Grid item xs={9}>
            <MiniBox m="0">
              <P fsize="0.9em">{walletInfo.balance}</P>
            </MiniBox>
          </Grid>
          <Grid item xs={3}>
            <Button h="100%" onClick={() => modal.handleOpen('buy-token')}>
              BUY
            </Button>
          </Grid>
        </Grid>
      </StyledBox>
    )
  }

  const renderCoin = () => (
    <StyledBox p="1em">
      {boxInfo('coin', 'Access coin')}
      <MiniBox p="0.5em" m="0.5em 0">
        <Cointable />
      </MiniBox>
      <ActionDiv justifyContent="center">
        <MarketPlaceButton variant="text" style={{ justifyContent: 'center', width: '100%' }}>
          <TextWrapper>
            <H3 className="with-animation-enlarge">WITHDRAW</H3>
          </TextWrapper>
        </MarketPlaceButton>
        <Button w="20%" onClick={() => modal.handleOpen('buy-token')}>
          BUY
        </Button>
      </ActionDiv>
    </StyledBox>
  )

  const renderActivityHistory = () => (
    <StyledBox p="1em">
      <Flex alignItems="center" justifyContent="space-between">
        <H2 fsize="1.2em">Activity History</H2>
        <MarketPlaceButton variant="text" title="View All" style={{ justifyContent: 'center' }} height="50%" />
      </Flex>
      <MiniBox p="2em 0.5em" m="0.5em 0">
        <Table data={activityHistory} />
      </MiniBox>
    </StyledBox>
  )

  const renderTxHistory = () => (
    <StyledBox p="1em">
      <Flex alignItems="center" justifyContent="space-between">
        <H2 fsize="1.2em">Transaction History</H2>
        <MarketPlaceButton variant="text" title="View All" style={{ justifyContent: 'center' }} height="50%" />
      </Flex>
      <TxTab tabController={props.tabController} />
      <MiniBox p="0.5em" m="0 0 0.5em  0">
        <Table data={txD} />
      </MiniBox>
    </StyledBox>
  )

  return (
    <ContentWrapper>
      {renderInfo()}
      {renderPoint()}
      {/* {renderCoin()} */}
      {/* {renderActivityHistory()} */}
      {/* {renderTxHistory()} */}
    </ContentWrapper>
  )
}

export default UserMain
