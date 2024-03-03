import React, { useState, useEffect } from 'react';
import { Flex, IconButton } from '@metagg/mgg-uikit';
import { Grid } from '@mui/material';
import Iconloader from '../../components/Foundation/Iconloader';
import MarketPlaceButton from '../../components/Foundation/Button';
import BasicTooltip from '../../components/Foundation/Tooltip';
import { H2, H3, H5, P, TextWrapper } from '../../components/Foundation/Text';
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2';
import { MiniBox } from '../../components/Foundation/Box';
import { FIELD_INFO } from './index.d';
import {
    ActionDiv,
    Button,
    ContentWrapper,
    NavButton,
    NavDiv,
    StyledBox,
} from './styled';
import Cointable from './Cointable';
import Table from './Table';
import TxTab from './TxTab';

const UserMain = (props: any) => {
    const {
        controllers: { modal },
    } = useMarketplaceV2();

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
          <div className="flex flex-wrap justify-evenly w-full items-center gap-3 my-3">
            {Object.entries(userInfo).map((info: any) => {
              const field =
                FIELD_INFO[info[0] as keyof typeof FIELD_INFO];
              const val = info[1].toString();
              return (
                <div className="grow flex justify-start items-center bg-[#131737] rounded-[10px] pr-[1em]">
                  <div className="bg-[#181020] p-3 rounded-l-[10px] mr-[1em]">
                    {field === "EMAIL ADDRESS" ?
                      <Iconloader type="fa" name={"At"} />
                      :
                      <Iconloader type="fa" name={"Wallet"} />
                    }
                  </div>
                  <b>{val}</b>
                </div>
              );
            })}
            {renderPoint()}
          </div>
        );
    };

  const renderPoint = () => {
    return (
      <div className="flex flex-wrap justify-center items-center bg-[#131737] rounded-[10px] pr-[1em]">
        <div className="bg-[#181020] p-3 rounded-l-[10px] mr-[1em]">
          <Iconloader type="fa" name={"DollarSign"} />
        </div>
        <b>{walletInfo.balance}</b>
      </div>
    )
  }

    const renderCoin = () => (
        <StyledBox p="1em">
            {boxInfo('coin', 'Access coin')}
            <MiniBox p="0.5em" m="0.5em 0">
                <Cointable />
            </MiniBox>
            <ActionDiv justifyContent="center">
                <MarketPlaceButton
                    variant="text"
                    style={{ justifyContent: 'center', width: '100%' }}
                >
                    <TextWrapper>
                        <H3 className="with-animation-enlarge">WITHDRAW</H3>
                    </TextWrapper>
                </MarketPlaceButton>
                <Button w="20%" onClick={() => modal.handleOpen('buy-token')}>
                    BUY
                </Button>
            </ActionDiv>
        </StyledBox>
    );

    const renderActivityHistory = () => (
        <StyledBox p="1em">
            <Flex alignItems="center" justifyContent="space-between">
                <H2 fsize="1.2em">Activity History</H2>
                <MarketPlaceButton
                    variant="text"
                    title="View All"
                    style={{ justifyContent: 'center' }}
                    height="50%"
                />
            </Flex>
            <MiniBox p="2em 0.5em" m="0.5em 0">
                <Table data={activityHistory} />
            </MiniBox>
        </StyledBox>
    );

    const renderTxHistory = () => (
        <StyledBox p="1em">
            <Flex alignItems="center" justifyContent="space-between">
                <H2 fsize="1.2em">Transaction History</H2>
                <MarketPlaceButton
                    variant="text"
                    title="View All"
                    style={{ justifyContent: 'center' }}
                    height="50%"
                />
            </Flex>
            <TxTab tabController={props.tabController} />
            <MiniBox p="0.5em" m="0 0 0.5em  0">
                <Table data={txD} />
            </MiniBox>
        </StyledBox>
    );

  return (
    <div className="flex flex-row w-full justify-center items-center">
      {renderInfo()}
      {/* {renderCoin()} */}
      {/* {renderActivityHistory()} */}
      {/* {renderTxHistory()} */}
    </div>
  )
}

export default UserMain;
