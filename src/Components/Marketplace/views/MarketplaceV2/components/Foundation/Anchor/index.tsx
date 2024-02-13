import React, { AnchorHTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'

const Anchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...otherProps }) => {
  const isHttpLink = href?.startsWith('http')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = isHttpLink ? 'a' : NavLink
  const props = isHttpLink ? { href, target: '_blank', rel: 'noopener noreferrer' } : { to: href, smooth: 'true' }
  return <Tag {...props} {...otherProps} />
}

export default Anchor
