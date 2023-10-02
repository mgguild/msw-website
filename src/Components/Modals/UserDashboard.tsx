import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PlayFab, PlayFabClient, PlayFabCloudScript } from 'playfab-sdk';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import usePlayfab from '../../Hooks/usePlayfab';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useSignMessage } from 'wagmi';
import { Triangle } from 'react-loader-spinner';
import { marginTop } from 'styled-system';
import { recoverMessageAddress } from 'viem';

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

const Container = styled.div`
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

export default function LoginRegister() {
    const user = usePlayfab((state: any) => state.user);
    const userTags = usePlayfab((state: any) => state.userTags);
    const userData = usePlayfab((state: any) => state.userData);
    const setUserInfo = usePlayfab((state: any) => state.setUserInfo);

    const [open, setOpen] = useState(false);
    const [binding, setBinding] = useState(false);
    const [_userData, setUserData] = useState<null | any>(null);
    const [_userTags, setUserTags] = useState<string[]>([]);
    const { address, isConnecting, isDisconnected, isConnected } = useAccount();
    const [recoveredAddress, setRecoveredAddress] = useState<string>();
    const {
        data: signMessageData,
        error,
        isLoading,
        signMessage,
        variables,
    } = useSignMessage();

    const handleLogout = () => {
        setUserInfo(null);
        setOpen(false);
    };

    useEffect(() => {
        setUserTags(userTags);
        setUserData(userData);

        console.log(`userTags: ${_userTags}`);
        console.log(`userData: ${userData}`);
    }, [userTags, userData]);

    useEffect(() => {
        (async () => {
            if (variables?.message && signMessageData) {
                const recoveredAddress = await recoverMessageAddress({
                    message: variables?.message,
                    signature: signMessageData,
                });
                setRecoveredAddress(recoveredAddress);
                setBinding(true);
                RunBindingWallet();
            }
        })();
    }, [signMessageData, variables?.message]);

    const handleBindWallet = () => {
        signMessage({
            message: 'Binding your wallet address to MSW',
        });
    };

    const RunBindingWallet = () => {
        PlayFabCloudScript.ExecuteFunction(
            {
                FunctionName: 'CheckWalletAddress',
                FunctionParameter: {
                    wallet: address,
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
                    obj['WalletAddress'].Value = address;
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
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container>
                            <h4>User Dashboard</h4>
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
                                                : ''}
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
                                            <ConnectKitButton />
                                        </div>

                                        {isConnected ? (
                                            <div
                                                style={{
                                                    margin: '2rem 0',
                                                    display: 'flex',
                                                    flexFlow: 'column',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                }}
                                            >
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
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )}
                                <div
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Button
                                        onClick={() => handleLogout()}
                                        borderRadius="8px"
                                        padding="0.8rem 1rem"
                                        type="submit"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </Col>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                {user.TitleInfo.DisplayName ?? user.Username}
            </Button>
        </>
    );
}
