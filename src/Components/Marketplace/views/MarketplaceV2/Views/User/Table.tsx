import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/constants'
import { STATUS, TableProps } from './index.d'

const Table = ({ data }: { data: TableProps[] }) => {
  return (
    <TableMain>
      <tbody>
        {data.map((d) => {
          return (
            <tr>
              {Object.values(d).map((i) => (
                <td style={{color: STATUS[i as keyof typeof STATUS]}}>{i}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </TableMain>
  )
}

export default Table

const TableMain = styled.table`
  width: 100%;
  tbody {
    tr td {
      font-family: 'Mustica Pro';
      text-align: center;
      font-size: 0.8em;
      padding: 5px;
      border-bottom: 1px solid ${COLORS.BORDER};
    }
  }
`
