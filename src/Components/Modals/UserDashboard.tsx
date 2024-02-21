import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PlayFabCloudScript } from 'playfab-sdk';
import { toast } from 'react-toastify';
import usePlayfab from '../../Hooks/usePlayfab';
import {
    ConnectWallet,
    useChain,
    useConnectionStatus,
    useDisconnect,
    useSigner,
    useAddress,
} from '@thirdweb-dev/react';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {MdlProps} from './types'

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

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

const Container = styled.div<{ persistent: boolean; }>`
    background-color: ${({ persistent }) => persistent ? '#ff8f00' : '#4f19a7'};
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
    flex-flow: column;
    gap: 0.5rem;
    width: 100%;

    input {
        border-radius: 5px;
    }
`;

const Col = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    gap: 1rem;
    background-color: #190128;
    padding: 2rem 1rem;
    border-radius: 0 0 10px 10px;
    justify-content: start;
    text-align: start;
`;

const Button = styled.button<{ padding?: any; borderRadius?: any }>`
    font-family: 'Alphakind', cursive;
    display: flex;
    background-color: #8252b9;
    padding: ${({ padding }) => padding ?? '0.5rem 1rem'};
    border-radius: ${({ borderRadius }) => borderRadius ?? '20px'};
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Buttons = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
    justify-content: center;

    a {
        text-decoration: none;
        color: white;
    }
`;

const Field = styled.div`
    display: block;
    width: 100%;
    border-radius: 12px;
    border: none;
    height: 68px;
    padding: 15px;
    background: #242d3b;
    color: #fff;
    display: flex;
    align-items: center;
`;

const Hdr = styled.div`
    margin: 2rem 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 1rem;
`;

const UserDashboard = ({
    show = false,
    persistent = false,
    showBtn = true,
    Header = 'USER DASHBOARD',
    Subheader
}: MdlProps) => {
    const user = usePlayfab((state: any) => state.user);
    const userTags = usePlayfab((state: any) => state.userTags);
    const userData = usePlayfab((state: any) => state.userData);
    const setUserInfo = usePlayfab((state: any) => state.setUserInfo);

    const [open, setOpen] = useState(show);
    const [binding, setBinding] = useState(false);
    const [_userData, setUserData] = useState<null | any>(null);
    const [_userTags, setUserTags] = useState<string[]>([]);

    const _chain = useChain();
    const _status = useConnectionStatus();
    const _address = useAddress();
    const _disoconnect = useDisconnect();
    const _signer = useSigner();

    const handleLogout = () => {
        setUserInfo(null);
        setOpen(false);
        _disoconnect();
    };

    useEffect(() => {
        setUserTags(userTags);
        setUserData(userData);

        console.log(`_chain: ${_chain?.name}`);
        console.log(`_status: ${_status}`);
    }, [userTags, userData, useChain(), useConnectionStatus()]);

    const handleBindWallet = () => {
        _signer
            ?.signMessage('Binding your wallet address to MSW')
            .then(e => {
                if (_address) {
                    setBinding(true);
                    RunBindingWallet();
                }
            })
            .catch((err: any) => {
                toast('Bind wallet confirmation rejected!', { type: 'warning' });
                console.log(err);
            });
    };

    const RunBindingWallet = () => {
        PlayFabCloudScript.ExecuteFunction(
            {
                FunctionName: 'CheckWalletAddress',
                FunctionParameter: {
                    wallet: _address,
                    playFabID: user.PlayFabId,
                },
            },
            (error, result) => {
                setBinding(false);

                if (error) {
                    toast(error.errorMessage, { type: 'error' });
                    return;
                }

                if (result.data.FunctionResult) {
                    toast('Wallet binding success!', { type: 'success' });
                    _userTags.push('title.D4F8F.BoundWallet');

                    var obj: any = {};
                    obj['WalletAddress'] = {};
                    obj['WalletAddress'].Value = _address;
                    setUserData(obj);
                } else {
                    toast('Error: Wallet address already in use!', { type: 'error' });
                }
            },
        );
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => persistent ? null : setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEscapeKeyDown={persistent}
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container persistent={persistent}>
                            <div style={{
                                display: 'flex',
                                flexFlow: 'column nowrap',
                                lineHeight: '0.5rem',
                                alignItems: 'center'
                            }}>
                                <h4>{Header}</h4>
                                {Subheader &&
                                    <p>{Subheader}</p>
                                }
                            </div>
                            <Col>
                                <Row>
                                    <span>Username:</span>
                                    <Field>{user.Username}</Field>
                                </Row>
                                <Row>
                                    <span>Email:</span>
                                    <Field>{user.PrivateInfo.Email}</Field>
                                </Row>

                                {_userTags.includes('title.D4F8F.BoundWallet') ? (
                                    <Row>
                                        <span>Bound Wallet Address</span>
                                        <Field>
                                            {_userData
                                                ? _userData['WalletAddress'].Value
                                                : ''
                                            }
                                        </Field>
                                    </Row>
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            alignItems: 'center',
                                            gap: '1rem',
                                        }}
                                    >
                                        <div>
                                            <ConnectWallet
                                                theme="dark"
                                                switchToActiveChain={true}
                                                auth={{
                                                    loginOptional: false,
                                                }}
                                            />
                                        </div>
                                        {persistent &&
                                            <p>
                                                User needs to bind their web3 wallet to use this page
                                            </p>
                                        }

                                        {_status === 'connected' ? (
                                            <Hdr>
                                                {binding ? (
                                                    <>
                                                        <Triangle
                                                            height="80"
                                                            width="80"
                                                            color="#4fa94d"
                                                            ariaLabel="triangle-loading"
                                                            wrapperStyle={{}}
                                                            visible={true}
                                                        />
                                                        <span
                                                            style={{ fontSize: '1rem' }}
                                                        >
                                                            Binding your wallet...
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            onClick={() =>
                                                                handleBindWallet()
                                                            }
                                                        >
                                                            Bind wallet
                                                        </Button>
                                                        <span
                                                            style={{ fontSize: '1rem' }}
                                                        >
                                                            Bind your wallet to your
                                                            account to play with your NFTs
                                                        </span>
                                                    </>
                                                )}
                                            </Hdr>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )}
                                <Buttons>
                                    <Link
                                        to="account/delete"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {!persistent &&
                                            <Button style={{ backgroundColor: 'red' }}>
                                                Delete Account
                                            </Button>
                                        }
                                    </Link>
                                    <Button
                                        onClick={() => handleLogout()}
                                        borderRadius="8px"
                                        padding="0.8rem 1rem"
                                        type="submit"
                                    >
                                        Logout
                                    </Button>
                                </Buttons>
                            </Col>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            {showBtn &&
                <Button
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    {user.TitleInfo.DisplayName ?? user.Username}
                </Button>
            }
        </>
    );
}

export default UserDashboard;
