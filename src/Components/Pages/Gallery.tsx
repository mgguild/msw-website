import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';

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
    grid-template-columns: 1fr 1fr 1fr ;
    gap: 1rem;
    justify-content: center;
    
    @media (max-width: 520px) {
        display: flex;
        flexWrap:'wrap',
        gap: '2rem',
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
        margin : '0 0 2rem 0',
    }

    img {
        @media (max-width: 520px) {
            width: 146px;
            height: 200px; 
            justify-content: center; 
        }
        @media (max-width: 320px){
            width: 146px;
            height: 203px;  
        }
    }
`;

const App: React.FC<{ isScreen550: boolean }> = ({ isScreen550 }) => {
    return (
        <>
            <div className="page-section" id="gallery">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className='titleCard'>
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
                            src={require('../../Assets/img/IMG_6291.jpg')}
                            alt="..."
                            width="600"
                            height="400"
                            
                        />
                        <img
                            src={require('../../Assets/img/IMG_6448.jpg')}
                            alt="..."
                            width="600"
                            height="400"
                        />
                        <img
                            src={require('../../Assets/img/IMG_6893.jpg')}
                            alt="..."
                            width="600"
                            height="400"
                        />
                        <img
                            src={require('../../Assets/img/IMG_9827.jpg')}
                            alt="..."
                            width="600"
                            height="400"
                        />
                        <img
                            src={require('../../Assets/img/DevCon20232.jpg')}
                            alt="..."
                            width="600"
                            height="400" 
                        />
                         <img
                            src={require('../../Assets/img/ESGS2023.jpg')}
                            alt="..."
                            width="600"
                            height="400" 
                        />
                    </Gallery>
                </SectCont>
            </div>
        </>
    );
};

export default App;
