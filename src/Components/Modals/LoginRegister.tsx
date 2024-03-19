import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState } from 'react';
import moment from 'moment'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PlayFabClient, PlayFabCloudScript } from 'playfab-sdk';
import { useAppDispatch } from '../Marketplace/state';
import { newCookie } from '../Marketplace/state/cookies/cookies';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import usePlayfab from '../../Hooks/usePlayfab';
import { MdlProps } from './types';
import Iconloader from '../Marketplace/views/MarketplaceV2/components/Foundation/Iconloader';


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
};

const CenterFrame = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div<{ persistent: boolean }>`
    background-color: ${({ persistent }) => (persistent ? '#ff8f00' : '#4f19a7')};
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

const CarouselItem = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    height: 100%;
`;

const Col = styled.form`
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

    div:last-of-type {
        margin-top: auto;
    }
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

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginRegister = ({
    show = false,
    persistent = false,
    showBtn = true,
    Header = 'LOGIN ACCOUNT',
    Subheader,
    mobile = false,
}: MdlProps) => {
    const dispatch = useAppDispatch()

    const setUserInfo = usePlayfab((state: any) => state.setUserInfo);
    const setUserTags = usePlayfab((state: any) => state.setUserTags);
    const setUserData = usePlayfab((state: any) => state.setUserData);
    const user = usePlayfab((state: any) => state.user);
    const userTags = usePlayfab((state: any) => state.userTags);

    const [open, setOpen] = useState(show);
    const [shwMsg, setShwMsg] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [carouselItem, setCarouselItem] = useState(0);

    const [login, setLogin] = useState('');
    const [loginPass, setLoginPass] = useState('');

    const [resEmail, setResEmail] = useState('')

    const handleClose = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfPassword('');
        setResEmail('');
        setOpen(false);
        setShwMsg(false);
    };

    const handleRegisterSubmit = (e: any) => {
        e.preventDefault();

        if (password === confPassword) {
            PlayFabClient.RegisterPlayFabUser(
                {
                    Email: email,
                    Username: username,
                    Password: password,
                    RequireBothUsernameAndEmail: true,
                },
                (error, result) => {
                    if (error) {
                        toast(error.errorMessage, { type: 'error' });
                        return;
                    }

                    toast('Register successful!', { type: 'success' });
                    setCarouselItem(0);
                    handleClose();
                },
            );
        } else {
            toast('Passwords do not match!', { type: 'warning' });
        }
    };

    const FetchTags = (playfabId: string) => {

        PlayFabClient.GetPlayerTags(
            {
                PlayFabId: playfabId,
            },
            (error, result) => {
                if (error) {
                    toast(error.errorMessage, { type: 'error' });
                    return;
                }

                setUserTags(result.data.Tags);

                if (result.data.Tags.includes('title.D4F8F.BoundWallet')) {
                    PlayFabClient.GetUserData(
                        {
                            PlayFabId: playfabId,
                            Keys: ['WalletAddress'],
                        },
                        async (error, result) => {
                            if (error) {
                                toast(error.errorMessage, { type: 'error' });
                                return;
                            }

                            const cookie = await dispatch(newCookie({name: 'playerTags', data: result.data.Data}))
                            console.log(cookie);

                            setUserData(result.data.Data);
                        },
                    );
                }
            },
        );
    };

    const handleLoginSubmit = (e: any) => {
        e.preventDefault();

        if (!re.test(login)) {
            toast.error('Invalid Email Address')
            return;
        }

        PlayFabClient.LoginWithEmailAddress(
            {
                Email: login,
                Password: loginPass,
                InfoRequestParameters: {
                    GetUserAccountInfo: true,
                    GetCharacterInventories: false,
                    GetCharacterList: false,
                    GetPlayerProfile: false,
                    GetPlayerStatistics: false,
                    GetTitleData: false,
                    GetUserData: false,
                    GetUserInventory: false,
                    GetUserReadOnlyData: false,
                    GetUserVirtualCurrency: false,
                },
            },
            async (error, result) => {
                if(!persistent){
                    handleClose();
                }
                if (error) {
                    toast(error.errorMessage, { type: 'error' });
                    return;
                }

                toast(`${login} logged in`, { type: 'success' });

                const cookie = await dispatch(newCookie({name: 'playerInfo', data: result.data.InfoResultPayload?.AccountInfo}))
                console.log(cookie);

                setUserInfo(result.data.InfoResultPayload?.AccountInfo);

                setTimeout(() => {
                    FetchTags(
                        result.data.InfoResultPayload?.AccountInfo?.PlayFabId ?? '',
                    );
                }, 100);
            },
        );
    };

    const handleResetAccount = (e: any) => {
        e.preventDefault();

        if (!re.test(resEmail)) {
            toast.error('Invalid Email Address')
            return;
        }

        PlayFabCloudScript.ExecuteFunction(
            {
                FunctionName: 'ResetAccount',
                FunctionParameter: {
                    email: resEmail,
                    playFabID: user.PlayFabId,
                },
            },
            (error, result) => {
                if (error) {
                    toast(error.errorMessage, { type: 'error' });
                    return;
                }

                toast('Reset account request sent!', { type: 'success' })
                setShwMsg(true);
            }
        )
    }

    return (
        <div style={{position: 'relative'}}>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEscapeKeyDown={persistent}
                disableAutoFocus
                slotProps={persistent ? {backdrop:{sx:{background: 'rgba(0, 0, 0)'}}} : {}}
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container persistent={persistent}>
                            <Carousel
                                showThumbs={false}
                                selectedItem={carouselItem}
                                showArrows={false}
                                showIndicators={false}
                                showStatus={false}
                            >
                                <CarouselItem style={{ width: '100%' }}>
                                    <h4>{Header}</h4>
                                    {Subheader && <p>{Subheader}</p>}
                                    <Col onSubmit={e => handleLoginSubmit(e)}>
                                        <Row>
                                            <span>Email:</span>
                                            <input
                                                type="email"
                                                placeholder=""
                                                defaultValue={login}
                                                onChange={e => setLogin(e.target.value)}
                                                required
                                            />
                                        </Row>
                                        <Row>
                                            <span>Password:</span>
                                            <input
                                                type="password"
                                                placeholder=""
                                                defaultValue={loginPass}
                                                onChange={e =>
                                                    setLoginPass(e.target.value)
                                                }
                                                required
                                            />
                                        </Row>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '2rem',
                                                marginTop: '1rem',
                                            }}
                                        >
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="submit"
                                            >
                                                Login
                                            </Button>
                                            {!persistent && (
                                                <Button
                                                    borderRadius="8px"
                                                    padding="0.8rem 1rem"
                                                    type="button"
                                                    onClick={e => handleClose()}
                                                >
                                                    Cancel
                                                </Button>
                                            )}

                                            {persistent && (
                                                <Link to='/marketplace'>
                                                    <Button
                                                        borderRadius="8px"
                                                        padding="0.8rem 1rem"
                                                        type="button"
                                                        onClick={e => handleClose()}
                                                        style={{color: 'white'}}
                                                    >
                                                        Go Back
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                        <div>
                                            <a
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '1rem',
                                                }}
                                                onClick={e => {setCarouselItem(2);}}
                                            >
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexFlow: 'column',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                            }}
                                        >
                                            <span style={{ fontSize: '1rem' }}>
                                                Not yet registered?
                                            </span>
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="button"
                                                onClick={e => setCarouselItem(1)}
                                            >
                                                Register
                                            </Button>
                                        </div>
                                    </Col>
                                </CarouselItem>
                                <CarouselItem>
                                    <h4>REGISTER ACCOUNT</h4>
                                    <Col onSubmit={e => handleRegisterSubmit(e)}>
                                        <Row>
                                            <span>Email:</span>
                                            <input
                                                type="email"
                                                placeholder="example@email.com"
                                                defaultValue={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </Row>
                                        <Row>
                                            <span>Username:</span>
                                            <input
                                                type="username"
                                                placeholder="must be 4 characters (no spaces & special characters)"
                                                defaultValue={username}
                                                onChange={e =>
                                                    setUsername(e.target.value)
                                                }
                                                required
                                            />
                                        </Row>
                                        <Row>
                                            <span>Password:</span>
                                            <input
                                                type="password"
                                                placeholder="must be 6 characters long"
                                                defaultValue={password}
                                                onChange={e =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />
                                        </Row>
                                        <Row>
                                            <span>Confirm Password:</span>
                                            <input
                                                type="password"
                                                placeholder="re-type password"
                                                defaultValue={confPassword}
                                                onChange={e =>
                                                    setConfPassword(e.target.value)
                                                }
                                                required
                                            />
                                        </Row>
                                        <div style={{ display: 'flex', gap: '2rem' }}>
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="submit"
                                            >
                                                Register
                                            </Button>
                                            {!persistent && (
                                                <Button
                                                    borderRadius="8px"
                                                    padding="0.8rem 1rem"
                                                    type="button"
                                                    onClick={e => handleClose()}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexFlow: 'column',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                            }}
                                        >
                                            <span style={{ fontSize: '1rem' }}>
                                                Already registered?
                                            </span>
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="button"
                                                onClick={e => setCarouselItem(0)}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </Col>
                                </CarouselItem>
                                <CarouselItem style={{ width: '100%' }}>
                                    <h4>Account Recovery</h4>
                                    <Col onSubmit={e => handleResetAccount(e)}>
                                        <Row>
                                            <span>Email</span>
                                            <input
                                                type="input"
                                                placeholder=""
                                                defaultValue={resEmail}
                                                onChange={e => setResEmail(e.target.value)}
                                                required
                                            />
                                        </Row>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '2rem',
                                                marginTop: '1rem',
                                            }}
                                        >
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="submit"
                                            >
                                                Reset Account
                                            </Button>
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="button"
                                                onClick={e => {setCarouselItem(0); setShwMsg(false)}}
                                            >
                                                Go Back
                                            </Button>
                                        </div>
                                        {shwMsg &&
                                            <div>
                                                If email matches, an email will be sent for account recovery
                                            </div>
                                        }

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexFlow: 'row nowrap',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                            }}
                                        >
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="button"
                                                onClick={e => {setCarouselItem(1); setShwMsg(false)}}
                                            >
                                                Register
                                            </Button>
                                            {!persistent && (
                                                <Button
                                                    borderRadius="8px"
                                                    padding="0.8rem 1rem"
                                                    type="button"
                                                    onClick={e => handleClose()}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                        </div>
                                    </Col>
                                </CarouselItem>
                            </Carousel>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            {showBtn &&
                (
                mobile ? (
                    <div onClick={() => setOpen(true)} className="cursor-pointer border-[#606060] pt-4 border-t-2">
                        <Iconloader type="fa" name="SignInAlt" />
                    </div>
                ) : (
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Login/Register
                    </Button>
                    )
                )
            }
        </div>
    );
};

export default LoginRegister;
