import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { LoginRegister, UserDashboard } from '../../../../../Modals';
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2';
import { HEIGHT, PADDING } from '../../styles/constants';
import { mswURL } from '../../constants/config';
import Logo from '../Foundation/Logo';
import usePlayfab from '../../../../../../Hooks/usePlayfab';

const StyledNav = styled.nav<{ isScreen480?: boolean }>`
    background-color: #181020;
    display: flex;
    flex-flow: ${({isScreen480}) => (isScreen480 ? 'column wrap' : 'row wrap')};
    justify-content: space-between;
    align-items: center;
    justify-content: ${({isScreen480}) => (isScreen480 ? 'center' : 'none')};;
    padding: 1em 5em 1em 5em !important;
`;

const Navbar = () => {
    const { controllers } = useMarketplaceV2();
    const user = usePlayfab((state: any) => state.user);

    const [isScreen480, setIsScreen480] = useState(false);

    const handleResize = () => {
        setIsScreen480(window.innerWidth < 480);
    };

    useMemo(() => {
        handleResize();
    }, []);

    return (
        <StyledNav isScreen480={isScreen480}>
            <Logo size={169} url={mswURL} />
            <div>{user ? <UserDashboard /> : <LoginRegister />}</div>
        </StyledNav>
    );
};

export default Navbar;

const StyledBtn = styled.button``;
