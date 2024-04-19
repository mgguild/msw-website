import { useState, useEffect } from 'react';
import { PlayFabClient } from 'playfab-sdk';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../Marketplace/state';
import usePlayfab from '../../Hooks/usePlayfab';
import { Hourglass } from 'react-loader-spinner';
import { MdlProps } from './types';
import { LoginRegCarousel } from './LoginRegister';
import { newCookie } from '../Marketplace/state/cookies/cookies';

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

const Buttons = styled.div<{ row?: boolean }>`
    display: flex;
    flex-flow: ${({ row }) => (row ? 'row' : 'column')} nowrap;
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

const Input = styled.input`
    padding: 1rem;
    background-color: #242d3b;
    border: white 2px solid;
    font-size: 2rem;
    font-family: 'Alphakind', cursive;
`;

const InputLabel = styled.span`
    font-weight: 1000;
    text-align: center;
    font-size: 1.2rem;
`;

const CreateGuild = ({ show = false, persistent = false }: MdlProps) => {
    const dispatch = useAppDispatch();
    const user = usePlayfab((state: any) => state.user);
    const setUserGuild = usePlayfab((state: any) => state.setUserGuild);

    const [open, setOpen] = useState(show);
    const [open2, setOpen2] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState('none');

    const handleCreateGuild = () => {
        setLoading('yes');
        PlayFabClient.ExecuteCloudScript(
            {
                FunctionName: 'CreateTitleGroup',
                FunctionParameter: {
                    name: name,
                    creatorEntity: user.TitleInfo.TitlePlayerAccount,
                },
            },
            async (error, result) => {
                if (error) {
                    toast.error(error.errorMessage);
                    setLoading('fail');
                    return;
                } else {
                    if (result.data.Error) {
                        toast.error(`Guild name ${name} not available`);
                        setLoading('fail');
                    } else if (result.data.FunctionResult) {
                        toast.success(`Guild ${name} successfully created`);
                        setLoading('success');
                        setUserGuild({
                            name: name,
                            entity: result.data.FunctionResult.groupData,
                        });
                        await dispatch(
                            newCookie({
                                name: 'userGuild',
                                data: {
                                    name: name,
                                    entity: result.data.FunctionResult.groupData,
                                    role: 'Administrators',
                                },
                            }),
                        );
                    }
                    setOpen(false);
                    setOpen2(false);
                    setLoading('none');
                    setName('');
                }
            },
        );
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => (persistent ? null : setOpen(false))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEscapeKeyDown={persistent}
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container persistent={user != null}>
                            {user ? (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexFlow: 'column nowrap',
                                            lineHeight: '0.5rem',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h4>Create Guild</h4>
                                    </div>
                                    <Col>
                                        <Row>
                                            <InputLabel>NAME</InputLabel>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                defaultValue={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                            />
                                        </Row>
                                        <Buttons>
                                            <Button
                                                onClick={() => setOpen2(true)}
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="submit"
                                            >
                                                Create
                                            </Button>
                                        </Buttons>
                                    </Col>
                                </>
                            ) : (
                                <LoginRegCarousel
                                    Header="Require User Login"
                                    Subheader="You need to login in order to create a guild!"
                                    setOpen={setOpen}
                                />
                            )}
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            <Modal
                open={open2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container persistent={false}>
                            {user ? (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexFlow: 'column nowrap',
                                            lineHeight: '0.5rem',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h4>
                                            {loading === 'yes'
                                                ? 'Creating Guild...'
                                                : 'Are you sure?'}
                                        </h4>
                                    </div>
                                    <Col>
                                        <Row>
                                            {loading === 'yes' ? (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Hourglass
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        ariaLabel="hourglass-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        colors={['#306cce', '#72a1ed']}
                                                    />
                                                </div>
                                            ) : (
                                                <InputLabel>
                                                    Guild "{' '}
                                                    <span style={{ color: 'orange' }}>
                                                        {name}
                                                    </span>{' '}
                                                    " will be created.
                                                </InputLabel>
                                            )}
                                        </Row>
                                        <Buttons row>
                                            {loading === 'none' && (
                                                <>
                                                    <Button
                                                        onClick={() =>
                                                            handleCreateGuild()
                                                        }
                                                        borderRadius="8px"
                                                        padding="0.8rem 1rem"
                                                        type="submit"
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        onClick={() => setOpen2(false)}
                                                        borderRadius="8px"
                                                        padding="0.8rem 1rem"
                                                        type="submit"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                        </Buttons>
                                    </Col>
                                </>
                            ) : (
                                <LoginRegCarousel
                                    Header="Require User Login"
                                    Subheader="You need to login in order to create a guild!"
                                    setOpen={setOpen}
                                />
                            )}
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            <button
                className="bg-[#FFB800] p-5 skew-x-[-6deg] rounded-[5px]"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <p className="font-bold uppercase text-[28px] skew-x-[6deg]">
                    Create Guild
                </p>
            </button>
        </>
    );
};

export default CreateGuild;
