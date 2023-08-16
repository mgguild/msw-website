import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
`;

const Gallery = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
`;

export default function App() {
    return (
        <>
            <div className="page-section" id="gallery">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard>
                        <h1>Gallery</h1>
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
                                fontSize: '64px',
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
                    </Gallery>
                </SectCont>
            </div>
        </>
    );
}
