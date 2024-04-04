import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { PlayFabCloudScript } from 'playfab-sdk';
import usePlayfab from '../../../Hooks/usePlayfab';
import { toast } from 'react-toastify';
import { padding } from 'styled-system';
import { useAppDispatch } from '../../Marketplace/state';
import { delCookies } from '../../Marketplace/state/cookies/cookies';

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
    height: 20rem;
    gap: 1rem;

    h1 {
        font-size: 2rem;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 2rem;

    a {
        color: white;
        text-decoration: none;
    }
`;

const Button = styled.button<{ padding?: any; borderRadius?: any }>`
    font-family: 'Alphakind', cursive;
    font-size: 1.5rem;
    display: flex;
    background-color: #8252b9;
    padding: ${({ padding }) => padding ?? '0.5rem 1rem'};
    border-radius: ${({ borderRadius }) => borderRadius ?? '20px'};
    align-items: center;
    justify-content: center;
    text-align: center;

    &:hover {
        background-color: #52307a;
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

const ColForm = styled.form`
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

const Col = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
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

const Input = styled.input`
    font-family: 'Alphakind', cursive;
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

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [_userData, _setUserData] = useState<null | any>('');
    const [deleting, setDeleting] = useState(false);

    const setUserInfo = usePlayfab((state: any) => state.setUserInfo);
    const setUserData = usePlayfab((state: any) => state.setUserData);
    const user = usePlayfab((state: any) => state.user);
    const userData = usePlayfab((state: any) => state.userData);

    useEffect(() => {
        _setUserData(userData);
        if (user === '' || !user) {
            setOpen2(true);
        }
    }, [userData]);

    const handleConfirmDelete = (e: any) => {
        e.preventDefault();

        if (confirmDelete?.toUpperCase() != 'delete'.toUpperCase()) {
            toast('you must type thw word "delete", check for typos', { type: 'error' });
        } else {
            setDeleting(true);

            PlayFabCloudScript.ExecuteFunction(
                {
                    FunctionName: 'DeleteMasterPlayer',
                    FunctionParameter: {
                        currentPlayerId: user.PlayFabId,
                        walletAddress: _userData['WalletAddress']?.Value ?? '',
                    },
                },
                (error, result) => {
                    setDeleting(false);
                    if (error) {
                        toast(error.errorMessage, { type: 'error' });
                        return;
                    }

                    if (result.data.FunctionResult) {
                        Logout();
                        toast('User deletion success!', { type: 'success' });
                    }
                },
            );
        }
    };

    const Logout = async () => {
        setUserInfo('');
        setOpen3(true);
        await dispatch(delCookies({names: ['playerInfo', 'playerTags', 'userData']}))
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
                        <ModalContainer>
                            <h4>Confirm Delete</h4>
                            <ColForm onSubmit={e => handleConfirmDelete(e)}>
                                <Col>
                                    <p>Type the word "delete" to confirm</p>
                                    <Input
                                        required
                                        onChange={e => {
                                            setConfirmDelete(e.target.value);
                                        }}
                                    />
                                </Col>
                                <Row>
                                    {deleting ? (
                                        <>
                                            <p>Deleting account...</p>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="submit"
                                            >
                                                Confirm
                                            </Button>
                                            <Button
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </Row>
                            </ColForm>
                        </ModalContainer>
                    </CenterFrame>
                </Box>
            </Modal>
            <Modal
                open={open2}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CenterFrame>
                    <ModalContainer>
                        <Row style={{ padding: '1rem 2rem' }}>
                            <h4 style={{ textAlign: 'center' }}>
                                User Not found! Please return to{' '}
                                <Link to={'/'}>homepage</Link> to login
                            </h4>
                        </Row>
                    </ModalContainer>
                </CenterFrame>
            </Modal>
            <Modal
                open={open3}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CenterFrame>
                    <ModalContainer>
                        <Row style={{ padding: '1rem 2rem' }}>
                            <h4 style={{ textAlign: 'center' }}>
                                User account deleted go back to{' '}
                                <Link to={'/'}>homepage</Link>
                            </h4>
                        </Row>
                    </ModalContainer>
                </CenterFrame>
            </Modal>
            <Container>
                <Menu>
                    <h1>
                        Are you sure you want to{' '}
                        <span style={{ color: 'red' }}>DELETE</span> [
                        <span style={{ color: '#ffef00' }}>{user.Username}</span>]
                    </h1>
                    <Buttons>
                        <Button padding={'1rem 2.4rem'} onClick={() => setOpen(true)}>
                            YES
                        </Button>
                        <Link to={'/'}>
                            <Button padding={'1rem 2.5rem'}>NO</Button>
                        </Link>
                    </Buttons>
                </Menu>
            </Container>
        </>
    );
};

export default App;
