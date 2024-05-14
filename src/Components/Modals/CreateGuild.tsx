import { useState, useEffect } from 'react';
import { PlayFabClient } from 'playfab-sdk';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../Marketplace/state';
import { createGuild, editGuild, deleteGuild } from '../Marketplace/state/playfab/playfab';
import { useRGuild } from '../Marketplace/state/hooks';
import usePlayfab from '../../Hooks/usePlayfab';
import { Hourglass } from 'react-loader-spinner';
import { MdlProps } from './types';
import { LoginRegCarousel } from './LoginRegister';
import { newCookie, delCookies } from '../Marketplace/state/cookies/cookies';
import { EntityKey, UserGuildData } from '../Marketplace/state/types';

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

const CreateGuild = ({ show = false, persistent = false, mode = 'create' }: MdlProps) => {
    const dispatch = useAppDispatch();
    const user = usePlayfab((state: any) => state.user);
    const userGuild = useRGuild();
    console.log(user);

    const [open, setOpen] = useState(show);
    const [open2, setOpen2] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState('none');

    const handleFunction = async () => {
        if(name.length < 6 && mode !== 'delete'){
            toast.warn("Guild name must be at least 6 characters long");
            setLoading('none');
            setOpen2(false);
            return
        }else{
            setLoading('yes');

            switch (mode) {
                case 'create':
                    const newGuild = await dispatch(createGuild({guildName: name, userEntity:  user.TitleInfo.TitlePlayerAccount}))
                    if((newGuild.payload as UserGuildData).status !== null){
                        toast.success(`Guild ${name} successfully created`);
                        setLoading('success');

                        await dispatch(
                            newCookie({
                                name: 'userGuild',
                                data: newGuild.payload,
                            }),
                        );
                    }
                break;
                case 'edit':
                    const reGuild = await dispatch(editGuild({_guildName: name, _groupEntity: userGuild.entity as EntityKey }))
                    console.log("EDIT GUILD")

                    if((reGuild.payload as UserGuildData).status !== null){
                        toast.success(`Guild successfully renamed`);
                        setLoading('success');

                        await dispatch(
                            newCookie({
                                name: 'userGuild',
                                data: reGuild.payload,
                            }),
                        );
                    }

                break;

                case 'delete':
                    setOpen(true);

                break;

                default:
                    toast.error("Somthing went wrong!");
                break;
            }
            if(mode !== 'delete'){
                setOpen(false);
                setOpen2(false);
                setLoading('none');
                setName('');
            }
        }
    };

    const handleCheck = async () => {
        if(mode === 'delete'){
            if(name.length <= 0){
                toast.warn("Confirmation input must not be empty");
                return;
            }
            if(name !== userGuild.name){
                toast.warn("Name and input mismatch, please try again");
                return;
            }
            setOpen(false);
            const delGuild = await dispatch(deleteGuild({_guildName: userGuild.name, _groupEntity: userGuild.entity as EntityKey}));

            if(((delGuild.payload as UserGuildData).status) === 'succesfully deleted'){
                toast.success("Guid successfully deleted");
                await dispatch(delCookies({ names: ['userGuild'] }))
            }

            setOpen(false);
            setOpen2(false);
            setLoading('none');
            setName('');
            return
        }

        if(name.length <= 0){
            if(mode === 'invite'){
                toast.warn("Player Id input must not be emtpy");
            }else{
                toast.warn("Name input must not be empty");
            }
            return;
        }else if(name.length < 6 && mode !== 'invite'){
            toast.warn("Guild name must be at least 6 characters long");
            return;
        }else if(mode === 'invite'){

        }else{
            if (mode === 'edit' && name === userGuild.name){
                toast.warn("New name cannot be same as current");
                return;
            }
            setOpen2(true);
        }
    }

    return (
        <>
            {/* Modal 1 */}
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setOpen2(false);
                }}
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
                                        {mode === 'create' && <h4>Create Guild</h4>}
                                        {mode === 'edit' && <h4>Edit Guild</h4>}
                                        {mode === 'delete' && <h4>Delete Guild</h4>}
                                        {mode === 'invite' && <h4>Invite Player</h4>}
                                    </div>
                                    <Col>
                                        <Row>
                                            <InputLabel>
                                                {mode === 'create' && <h4>NAME</h4>}
                                                {mode === 'edit' && <h4>NEW GUILD NAME</h4>}
                                                {mode === 'delete' && <h4>TYPE "{userGuild.name}" TO DELETE YOUR GUILD</h4>}
                                                {mode === 'invite' && <h4>Player code Id</h4>}
                                            </InputLabel>
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
                                                onClick={() => handleCheck()}
                                                borderRadius="8px"
                                                padding="0.8rem 1rem"
                                                type="submit"
                                            >
                                                {mode === 'create' && <h4>Create</h4>}
                                                {mode === 'edit' && <h4>Rename</h4>}
                                                {mode === 'delete' && <h4>Delete</h4>}
                                                {mode === 'invite' && <h4>Invite</h4>}
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
            {/* Modal 2 */}
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
                                                ? <>
                                                    {mode === 'create' && 'Creating Guild...'}
                                                    {mode === 'edit' && 'Renaming Guild...'}
                                                    {mode === 'delete' && 'Deleting Guild...'}
                                                </>
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
                                                    { mode === 'crate' &&
                                                        <>
                                                            Guild "{' '}
                                                            <span style={{ color: 'orange' }}>
                                                                {name}
                                                            </span>{' '}
                                                            " will be created.
                                                        </>
                                                    }

                                                    { mode === 'edit' &&
                                                        <>
                                                            Guild "{' '}
                                                            <span style={{ color: 'orange' }}>
                                                                {userGuild.name}
                                                            </span>{' '}
                                                            " will be renamed to "{' '}
                                                            <span style={{ color: 'orange' }}>
                                                                {name}
                                                            </span>{' '}
                                                            ".
                                                        </>
                                                    }

                                                    { mode === 'delete' &&
                                                        <>
                                                            Guild "{' '}
                                                            <span style={{ color: 'orange' }}>
                                                                {userGuild.name}
                                                            </span>{' '}
                                                            " will be deleted.
                                                        </>
                                                    }
                                                </InputLabel>
                                            )}
                                        </Row>
                                        <Buttons row>
                                            {loading === 'none' && (
                                                <>
                                                    <Button
                                                        onClick={() =>
                                                            handleFunction()
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
            {mode === 'create' && <button
                className="bg-[#FFB800] p-5 skew-x-[-6deg] rounded-[5px]"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <p className="font-bold uppercase text-[28px] skew-x-[6deg]">
                    Create Guild
                </p>
            </button>}
            {mode === 'edit' && <button
                className="bg-[#FFB800] p-2 skew-x-[-6deg] rounded-[5px]"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <p className="font-bold uppercase text-[1.2rem] skew-x-[6deg]" style={{marginBottom: '0.2rem'}}>
                    Rename
                </p>
            </button>}
            {mode === 'delete' && <button
                className="bg-[#f32121] p-2 skew-x-[-6deg] rounded-[5px]"
                onClick={() => {
                    setOpen2(true);
                }}
            >
                <p className="font-bold uppercase text-[1.2rem] skew-x-[6deg]" style={{marginBottom: '0.2rem'}}>
                    Delete
                </p>
            </button>}
            {mode === 'invite' && <button
                className="bg-[#2f8cfd] p-2 skew-x-[-6deg] rounded-[5px]"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <p className="font-bold uppercase text-[1.2rem] skew-x-[6deg]" style={{marginBottom: '0.2rem'}}>
                    Invite
                </p>
            </button>}
        </>
    );
};

export default CreateGuild;
