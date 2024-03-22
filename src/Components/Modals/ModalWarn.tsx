import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ConnectWallet } from '@thirdweb-dev/react';

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
    background-color: #ff8f00;
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

const MdlWarn = ({message = 'Error!'}: {message: string}) => {
    const [open, setOpen] = useState(true);

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
                            <div
                                style={{
                                    display: 'flex',
                                    flexFlow: 'column nowrap',
                                    lineHeight: '0.5rem',
                                    alignItems: 'center',
                                }}
                            >
                                <h4>Error</h4>
                            </div>
                            <Col>
                                <Row style={{ textAlign: 'center' }}>
                                    <span>{message}</span>
                                </Row>
                            </Col>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
        </>
    );
};

export default MdlWarn;
