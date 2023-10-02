import { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const HomeCont = styled.div`
    align-items: center !important;
    flex-direction: column !important;
    display: flex !important;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
    margin: 0 0 4rem 0;
`;

const VidCont = styled.video`
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    background-position-x: center;
`;

const PlayBtn = styled.a`
    width: 100px;
    height: 100px;
    background: radial-gradient(rgb(112, 76, 179, 0.8) 60%, rgba(255, 255, 255, 1) 62%);
    border-radius: 50%;
    position: relative;
    display: block;
    margin: 1.2rem 0;
    box-shadow: 0px 0px 20px 3px #fff;
    user-select: none;
    -webkit-user-drag: none;

    &:before {
        content: '';
        position: absolute;
        width: 150%;
        height: 150%;
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-animation: pulsate1 2s;
        animation: pulsate1 2s;
        -webkit-animation-direction: forwards;
        animation-direction: forwards;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-timing-function: steps;
        animation-timing-function: steps;
        opacity: 1;
        border-radius: 50%;
        border: 5px solid #fff;
        top: -25%;
        left: -25%;
        background: whitesmoke;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-40%) translateY(-50%);
        transform: translateX(-40%) translateY(-50%);
        transform-origin: center center;
        width: 0;
        height: 0;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        border-left: 25px solid #fff;
        z-index: 1;
        -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
        transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
`;

const YtBtn = styled.button`
    padding: 0px;
    margin-bottom: 0px;
    line-height: 0px;
    border: 0px !important;
    background-color: transparent !important;
`;

const PlayBtns = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 0rem 4rem;
`;

const GrowBtn = styled.div<{ isSmallScreen?: boolean }>`
    max-width: 17rem;
    width: ${({ isSmallScreen }) => (isSmallScreen ? '11rem' : '17rem')};
    height: 100%;
    margin-left: -7px;
    margin-top: 18px;

    img {
        transition: 1s ease;

        &:hover {
            -webkit-transform: scale(1.2);
            -ms-transform: scale(1.2);
            transform: scale(1.2);
            transition: 1s ease;
        }
    }
`;

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const FramWrapper = styled.div`
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

const FramContainer = styled.div`
    width: 80%; /* Adjust this value as needed */
    background-color: white;
    position: relative;

    &:before {
        content: '';
        display: block;
        padding-top: 56.25%; /* 16:9 aspect ratio (9 / 16 = 0.5625) */
    }
`;

const App: React.FC<{ isScreen550: boolean }> = ({ isScreen550 }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FramWrapper>
                        <FramContainer className="embed-responsive">
                            <iframe
                                id="video"
                                width="100%"
                                height="100%"
                                className="responsive-iframe"
                                src="https://www.youtube.com/embed/ghc75mbiip4"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </FramContainer>
                    </FramWrapper>
                </Box>
            </Modal>
            <div
                className="hero page-section"
                id="home"
                style={{ marginTop: '0px', height: '91vh' }}
            >
                <VidCont
                    autoPlay
                    muted
                    loop
                    controls={false}
                    disablePictureInPicture={true}
                >
                    <source
                        src={require('../../Assets/vid/Animated_MSW_Lobby.webm')}
                        type="video/webm"
                    />
                    <source
                        src={require('../../Assets/vid/Animated_MSW_Lobby.mp4')}
                        type="video/mp4"
                    />
                </VidCont>
                <HomeCont>
                    <img
                        style={{ width: '30rem' }}
                        src={require('../../Assets/img/MSW_Logo2.png')}
                        alt="msw_logo"
                    />

                    <div className="yt-trailer">
                        <YtBtn
                            name="play-btn"
                            onClick={() => {
                                setOpen(true);
                            }}
                            type="button"
                            aria-label="youtube-trailer"
                            className="btn btn-primary video-btn"
                        >
                            <PlayBtn className="play-btn" href="#"></PlayBtn>
                        </YtBtn>
                    </div>
                    <PlayBtns>
                        <GrowBtn isSmallScreen={isScreen550}>
                            <a
                                className="btn-googleplay hover-shadow"
                                target="_blank"
                                href="https://www.metagg.com/msw-webgl-build/"
                            >
                                <img
                                    className="btn-googleplay"
                                    src={require('../../Assets/img/7a3njak3278u099fg.png')}
                                />
                            </a>
                        </GrowBtn>
                        <GrowBtn isSmallScreen={isScreen550}>
                            <a
                                className="btn-googleplay hover-shadow"
                                target="_blank"
                                href="https://play.google.com/store/apps/details?id=com.metagg"
                            >
                                <img
                                    className="btn-googleplay"
                                    src={require('../../Assets/img/5a902dbf7f96951c82922875.png')}
                                />
                            </a>
                        </GrowBtn>
                        <GrowBtn isSmallScreen={isScreen550}>
                            <img
                                className="btn-googleplay"
                                src={require('../../Assets/img/coming-soon-png_47446.png')}
                            />
                        </GrowBtn>
                    </PlayBtns>
                </HomeCont>
            </div>
        </>
    );
};

export default App;
