import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PlayFabClient } from 'playfab-sdk';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import usePlayfab from '../../Hooks/usePlayfab';

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

export default function LoginRegister() {
    const setUserInfo = usePlayfab((state: any) => state.setUserInfo);
    const setUserTags = usePlayfab((state: any) => state.setUserTags);
    const setUserData = usePlayfab((state: any) => state.setUserData);
    const user = usePlayfab((state: any) => state.user);

    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [carouselItem, setCarouselItem] = useState(0);

    const [login, setLogin] = useState('');
    const [loginPass, setLoginPass] = useState('');

    const handleClose = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfPassword('');
        setOpen(false);
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
                        (error, result) => {
                            if (error) {
                                toast(error.errorMessage, { type: 'error' });
                                return;
                            }

                            setUserData(result.data.Data);
                        },
                    );
                }
            },
        );
    };

    const handleLoginSubmit = (e: any) => {
        e.preventDefault();
        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(login)) {
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
                (error, result) => {
                    if (error) {
                        toast(error.errorMessage, { type: 'error' });
                        return;
                    }

                    toast(`${login} logged in`, { type: 'success' });
                    setUserInfo(result.data.InfoResultPayload?.AccountInfo);

                    setTimeout(() => {
                        FetchTags(
                            result.data.InfoResultPayload?.AccountInfo?.PlayFabId ?? '',
                        );
                    }, 100);
                },
            );
        } else {
            PlayFabClient.LoginWithPlayFab(
                {
                    Username: login,
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
                (error, result) => {
                    if (error) {
                        toast(error.errorMessage, { type: 'error' });
                        return;
                    }

                    toast(`${login} logged in`, { type: 'success' });
                    setUserInfo(result.data.InfoResultPayload?.AccountInfo);

                    setTimeout(() => {
                        FetchTags(
                            result.data.InfoResultPayload?.AccountInfo?.PlayFabId ?? '',
                        );
                    }, 100);
                },
            );
        }
    };

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container>
                            <Carousel
                                showThumbs={false}
                                selectedItem={carouselItem}
                                showArrows={false}
                                showIndicators={false}
                                showStatus={false}
                            >
                                <CarouselItem style={{ width: '100%' }}>
                                    <h4>LOGIN ACCOUNT</h4>
                                    <Col onSubmit={e => handleLoginSubmit(e)}>
                                        <Row>
                                            <span>Email or Username:</span>
                                            <input
                                                type="input"
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
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="button"
                                                onClick={e => handleClose()}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                        <div>
                                            <a
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '1rem',
                                                }}
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
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="button"
                                                onClick={e => handleClose()}
                                            >
                                                Cancel
                                            </Button>
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
                            </Carousel>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Login/Register
            </Button>
        </>
    );
}
