import React from 'react'
import { DEFAULT_BORDERS } from 'views/MarketplaceV2/styles/constants'
import styled from 'styled-components'
import Link from '../Foundation/Anchor'
import { MiniBox as Box } from '../Foundation/Box'

type Props = {
  href: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const Navbutton: React.FC<Props> = ({ href, children, ...props }) => {
  return (
    <Link href={href} {...props}>
      <Box>{children}</Box>
    </Link>
  )
}

export default Navbutton
