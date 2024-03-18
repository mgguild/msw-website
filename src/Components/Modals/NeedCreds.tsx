import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import type { Location, Params } from 'react-router-dom';
import usePlayfab from '../../Hooks/usePlayfab';
import LoginRegister from './LoginRegister';
import UserDashboard from './UserDashboard';
import NdCnctWlt from './NeedConnectWallet';
import NdSmWltAddrs from './NeedSameWalletAddr';
import { useChain, useConnectionStatus, useAddress } from '@thirdweb-dev/react';

interface Needs {
    wallet?: boolean;
    walletConnect?: boolean;
    sameWallet?: boolean;
}

const getRoutePath = (location: Location, params: Params): string => {
    const { pathname } = location;

    if (!Object.keys(params).length) {
        return pathname; // we don't need to replace anything
    }

    let path = pathname;
    Object.entries(params).forEach(([paramName, paramValue]) => {
        if (paramValue) {
            path = path.replace(paramValue, `:${paramName}`);
        }
    });
    return path;
};

const NeedCreds = ({
    wallet = false,
    sameWallet = false,
    walletConnect = false,
}: Needs) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const path = getRoutePath(location, params);

    const user = usePlayfab((state: any) => state.user);
    const userTags = usePlayfab((state: any) => state.userTags);
    const userData = usePlayfab((state: any) => state.userData);

    const _status = useConnectionStatus();
    const _address = useAddress();
    const _chain = useChain();

    const [_userData, setUserData] = useState<null | any>(null);
    const [_userTags, setUserTags] = useState<string[]>([]);

    useEffect(() => {
        setUserTags(userTags);
        setUserData(userData);

        if (path !== '/WalletError') {
            navigate(path);
        }

        if (
            sameWallet &&
            user &&
            _userData &&
            _status === 'connected' &&
            `${_userData['WalletAddress'].Value}`.toUpperCase() !== `${_address}`.toUpperCase()
        ) {
            console.log('REDIRECT TO WALLET ERROR');
            navigate('/WalletError', { replace: true });
        }
    }, [userTags, userData, _userData, _status, _address, useChain(), useConnectionStatus()]);

    return (
        <>
            {!user && (
                <LoginRegister
                    show={true}
                    persistent={true}
                    showBtn={false}
                    Header="Need User Login"
                    Subheader="User needs to login in order to use this page"
                />
            )}
            {wallet && user && userTags.includes === 'title.D4F8F.BoundWallet' && (
                <UserDashboard
                    show={true}
                    persistent={true}
                    showBtn={false}
                    Header="Require Bound Wallet"
                    Subheader="Missing bound wallet"
                />
            )}
            {walletConnect && user && _status !== 'connected' && <NdCnctWlt />}
            {sameWallet &&
                user &&
                _userData &&
                _status === 'connected' &&
                `${_userData['WalletAddress'].Value}`.toUpperCase() !== `${_address}`.toUpperCase() && <NdSmWltAddrs />}
        </>
    );
};

export default NeedCreds;
