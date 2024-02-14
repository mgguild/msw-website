import { Tooltip } from '@mui/material'
import React from 'react'

const BasicTooltip: React.FC<{title: string, children: any}> = ({title, children}) => {
  return (
    <Tooltip title={title} arrow placement="top">
      {children}
    </Tooltip>
  )
}

export default BasicTooltip