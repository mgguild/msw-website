import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../../../Styled';

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;

    @media (max-width: 720px) {
        display: flex;
        flex-flow: column wrap;
    }

    h1 {
        font-size: '64px';

        @media (max-width: 520px) {
            font-size: 2.5rem;
        }
    }
`;

const Gallery = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    @media (max-width: 520px) {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
        margin: 0 0 2rem 0;
    }

    img {
        width: 100%;
        height: auto;
        background-color: #f0f0f0; /* Placeholder color */
        
        @media (max-width: 500px) {
            width: 154px;
            height: 215px;
            justify-content: center;
        }
        @media (max-width: 430px) {
            width: 174px;
            height: 215px;
        }
        @media (max-width: 414px) {
            width: 200px;
            height: 280px;
        }
        @media (max-width: 390px){
            width: 200px;
            height: 280px;
        }
        @media (max-width: 320px){
            width: 120px;
            height: 166px;
        }
    }
`;

const App: React.FC<{ isScreen550: boolean }> = ({ isScreen550 }) => {
    return (
        <div className="page-section" id="gallery">
            <SectHdr>
                <TitleCard className="titleCard">
                    <h1 style={{ fontSize: '2.2rem' }}>Gallery</h1>
                </TitleCard>
            </SectHdr>
            <SectCont
                style={{ flexFlow: 'column wrap' }}
                margin="auto"
                maxWidth="1140px"
            >
                <Header>
                    <h1
                        style={{
                            color: '#ECB602',
                            lineHeight: '0.9',
                        }}
                    >
                        Permafaria Events Gallery
                    </h1>
                    <p>
                        Step into the real-world excitement as we venture to diverse
                        events, dedicated to fostering mass adoption and expanding our
                        player base. Don’t miss out on the action; be part of our
                        upcoming events and tournaments to win exclusive MSW Merch and
                        thrilling prizes!
                    </p>
                </Header>
                <Gallery>
                    <img
                        src={require('../../../../Assets/img/IMG_6291.jpg')}
                        alt="..."
                    />
                    <img
                        src={require('../../../../Assets/img/IMG_6448.jpg')}
                        alt="..."
                    />
                    <img
                        src={require('../../../../Assets/img/IMG_6893.jpg')}
                        alt="..."
                    />
                    <img
                        src={require('../../../../Assets/img/IMG_9827.jpg')}
                        alt="..."
                    />
                    <img
                        src={require('../../../../Assets/img/DevCon20232.jpg')}
                        alt="..."
                    />
                    <img
                        src={require('../../../../Assets/img/ESGS2023.jpg')}
                        alt="..."
                    />
                </Gallery>
            </SectCont>
        </div>
    );
};

export default App;
