import React from 'react';
import { StyledPanel, StyledPanelBody, StyledPanelFooter } from './styled';
import { Props } from './index.d';
import Navbutton from './Navbutton';
import Iconloader from '../Foundation/Iconloader';
import usePlayfab from '../../../../../../Hooks/usePlayfab';
import { LoginRegister, UserDashboard } from '../../../../../Modals';
import { useFetchImg } from '../../../../utils/assetFetch';

const Panel: React.FC<{ links: Props }> = (props) => {
  const { links } = props
  const user = usePlayfab((state: any) => state.user)

  const src = { name: 'msw', folder: 'logo' }
  const msw = useFetchImg(src)

  return (
    // <StyledPanel className="sidebar-container nav-drop-shadow">
    //   <StyledPanelBody className="sidebar-nav">
    //     {links.map((link) => {
    //       return (
    //         <Navbutton key={link.name} href={link.href} className="link">
    //           <Iconloader type="fa" name={link.name} className="with-animation-enlarge" />
    //         </Navbutton>
    //       )
    //     })}
    //   </StyledPanelBody>
    //   {/* <StyledPanelFooter className="sidebar-footer">
    //     <Navbutton href="/help" className="link" target="_blank" rel="noopener noreferrer">
    //       <Iconloader type="fa" name="ExclamationCircle" className="with-animation-enlarge" />
    //     </Navbutton>
    //   </StyledPanelFooter> */}
    // </StyledPanel>
    <div className="flex flex-col h-[100vh] fixed justify-between items-center bg-[#181020]">
      <div className="flex flex-col justify-center items-center gap-4 py-4 px-3">
        <div className="border-[#606060] border-b-2 pb-4">
          <img src={msw} alt="Meta Saga Warriors" className="w-[60px] h-[60px] rounded-full" />
        </div>
        {
          links.map((link) => {
            return (
              <Navbutton key={link.name} href={link.href} className="link">
                <Iconloader type="fa" name={link.name} className="with-animation-enlarge" />
              </Navbutton>
            )
          })
        }
      </div>
      <div className="px-3 pb-4">
        {user ? <UserDashboard mobile={true} /> : <LoginRegister mobile={true} />}
      </div>
    </div>
  )
}

export default Panel;
