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
        {/* <Inner>{children}</Inner> */}
        <div className="w-full p-5 bg-gradient-to-b from-[#181020] to-[#2A2964]">
          {children}
        </div>
      </BodyWrapper>
    </Wrapper>
  )
}

export default Sidebar
