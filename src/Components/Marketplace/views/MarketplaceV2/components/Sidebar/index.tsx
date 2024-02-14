import React from 'react'
import { useMedia } from 'use-media'
import Panel from './Panel'
import { Wrapper, BodyWrapper, Inner } from './styled'
import { links } from './config'

const Sidebar: React.FC<{ children: React.ReactNode }> = ( {children} ) => {
  // const isWide = useMedia({ minWidth: 1000 })

  return (
    <Wrapper>
      <BodyWrapper>
        <Panel links={links} />
        <Inner>{children}</Inner>
      </BodyWrapper>
    </Wrapper>
  )
}

export default Sidebar
