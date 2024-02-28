import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import usePlayfab from '../../../Hooks/usePlayfab';
import { useConnectionStatus, useAddress } from '@thirdweb-dev/react';
import { ConnectWallet } from '@thirdweb-dev/react';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
    align-items: center;
`;

const Menu = styled.div`
    background-color: #4f19a7;
    font-family: 'Alphakind', cursive;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    gap: 1rem;

    h1 {
        font-size: 2rem;
    }
`;

const CenterFrame = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: #4f19a7;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    border: white solid 2px;
    border-radius: 10px;
    min-width: 15rem;
    width: 35rem;
    gap: 1.5rem;
    margin: 1rem;

    h4 {
        font-family: 'Alphakind', cursive;
        letter-spacing: 3px;
        font-size: 1.5rem;
        font-weight: 700;
        padding: 2rem 0rem 0.5rem 0rem;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;

    p {
        font-family: 'Alphakind', cursive;
        font-size: 1.3rem;
    }

    input {
        border-radius: 5px;
    }
`;

const WalletInfo = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    line-height: 0.1rem;

    span {
        font-family: Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace !important;
        font-size: 1.5rem;
    }
`

const App: React.FC = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [_userData, _setUserData] = useState<null | any>('');

    const user = usePlayfab((state: any) => state.user);
    const userData = usePlayfab((state: any) => state.userData);

    const _address = useAddress();
    const _status = useConnectionStatus();

    useEffect(() => {
        _setUserData(userData);

        if (user === '' || !user || _status !== 'connected') {
            setOpen(true);
        }

        if (_status === 'connected' && _userData && _userData['WalletAddress'].Value === _address) {
            navigate(-1);
        }
    }, [user, userData, _address]);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CenterFrame>
                    <ModalContainer>
                        <Row style={{ padding: '1rem 2rem' }}>
                            <h4 style={{ textAlign: 'center' }}>
                                {user && <p>User Not found! Please return to </p>}
                                {_status === 'connected' && (
                                    <p>Connect wallet or return to </p>
                                )}
                                <Link to={'/'}>homepage</Link> to login
                            </h4>
                        </Row>
                    </ModalContainer>
                </CenterFrame>
            </Modal>

            {user && _userData['WalletAddress'] && (
                <Container>
                    <Menu>
                        <h1>Connected wallet address must be same as bound wallet</h1>
                        <h1>User must switch to bound wallet address</h1>
                        <br />
                        <br />
                        <WalletInfo>
                            <h1>User Bound Wallet:</h1>
                            <span>
                                [
                                <span style={{ color: '#ffef00' }}>
                                    {_userData['WalletAddress'].Value}
                                </span>
                                ]
                            </span>
                        </WalletInfo>
                        <br />
                        <WalletInfo>
                            <h1>Wallet Connected:</h1>
                            <span>
                                [
                                <span style={{ color: '#ff4d00' }}>
                                    {_address}
                                </span>
                                ]
                            </span>
                        </WalletInfo>
                        <ConnectWallet />
                    </Menu>
                </Container>
            )}
        </>
    );
};

export default App;
