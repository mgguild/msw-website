import { IconButton, Flex } from '@metagg/mgg-uikit'
import React from 'react'
import styled from 'styled-components'
import { MiniBox } from 'views/MarketplaceV2/components/Foundation/Box'
import Iconloader from 'views/MarketplaceV2/components/Foundation/Iconloader'
import { P } from 'views/MarketplaceV2/components/Foundation/Text'

const Cointable = () => {
  return (
    <TableMain>
      <thead>
        <tr>
          <th colSpan={2}>Balance</th>
          <th>Withdrawal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="token-name">MGG</td>
          <td>0.00 </td>
          <td>
            0.00 &nbsp;
            <IconButton variant="text" className="icon-button">
              <MiniBox m="0" p="5px">
                <Iconloader type="fa" name="InfoCircle" fontSize="1em" />
              </MiniBox>
            </IconButton>
          </td>
        </tr>
        <tr>
          <td className="token-name">USDT</td>
          <td>0.00 </td>
          <td>
            0.00 &nbsp;
            <IconButton variant="text" className="icon-button">
              <MiniBox m="0" p="5px">
                <Iconloader type="fa" name="InfoCircle" fontSize="1em" />
              </MiniBox>
            </IconButton>
          </td>
        </tr>
      </tbody>
    </TableMain>
  )
}

export default Cointable

const TableMain = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0.3em;

  thead > tr th,
  tbody > tr td {
    font-family: 'Mustica Pro';
    font-size: 0.9em;
  }
  tbody > tr td {
    padding: 0em 1em;
    position: relative;
    .icon-button {
      height: auto;
      position: absolute;
      margin-top: -10px;
      display: none;
      ${({ theme }) => `
        ${theme.mediaQueries.sm}{
          display: inline-block;
        }
      `}
    }
  }
  thead > tr th {
    padding: 1em 1em;
  }
  tr {
    text-align: right;
    .token-name {
      text-align: center;
    }

    & > td {
      border-right: 3px solid white;
      &:last-child {
        border: none;
      }
    }
  }

  ${({ theme }) => `
    ${theme.mediaQueries.sm} {
      border-spacing: 1em;
    }
  `}
`

const TableHeader = styled.div`
  border: 1px solid blue;
`
