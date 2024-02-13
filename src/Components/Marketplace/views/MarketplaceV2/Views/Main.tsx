import React from 'react'
import ViewsLayout, { StyledViews } from '../components/Foundation/layout/Views'
import Sidebar from '../components/Sidebar'
import UserHighlight from '../components/UserHighlight'

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ViewsLayout>
      <StyledViews>
        <Sidebar>
          <UserHighlight />
          {children}
        </Sidebar>
      </StyledViews>
    </ViewsLayout>
  )
}

export default Main
