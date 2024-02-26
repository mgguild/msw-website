import { LoginRegister, UserDashboard } from '../../../../../Modals';
import styled from 'styled-components'
import useTheme from '../../../../hooks/useTheme'
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2'
import { HEIGHT, PADDING } from '../../styles/constants'
import { mswURL } from '../../constants/config'
import Logo from '../Foundation/Logo'
import { useAppDispatch } from '../../../../state'
import usePlayfab from '../../../../../../Hooks/usePlayfab';


const Navbar = () => {
  const { controllers } = useMarketplaceV2()
  const user = usePlayfab((state: any) => state.user);

  return (
    <StyledNav>
      <Logo size={169} url={mswURL} />
      <div>
          {user ? <UserDashboard /> : <LoginRegister />}
      </div>
    </StyledNav>
  )
}

export default Navbar

const StyledNav = styled.nav`
  background-color: #181020;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 5em 1em 5em !important;
`

const StyledBtn = styled.button``
