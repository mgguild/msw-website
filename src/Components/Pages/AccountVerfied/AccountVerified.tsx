import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { PlayFabCloudScript } from 'playfab-sdk';
import usePlayfab from '../../../Hooks/usePlayfab';
import { toast } from 'react-toastify';
import { padding } from 'styled-system';

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


    return (
        <>
            <Container>
                <Menu>
                    <h1>
                        Thank you! Your account has been verified
                    </h1>
                    <Buttons>
                        <Link to={'/'}>
                            <Button padding={'1rem 2.5rem'}>RETURN HOME</Button>
                        </Link>
                    </Buttons>
                </Menu>
            </Container>
        </>
    );
};

export default App;
