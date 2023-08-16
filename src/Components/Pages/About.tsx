import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';

const About = styled.div`
    background-image: url(${require('../../Assets/img/about_bg.png')});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    flex: 1;
    text-align: justify;
    line-height: 1.5rem;

    h1 {
        text-align: center;
    }
`;

const AboutImg = styled.div`
    background-image: url(${require('../../Assets/img/about_img.png')});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    flex: 1;
`;

export default function App() {
    return (
        <>
            <div className="page-section" id="about">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard>
                        <h1>ABOUT</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont>
                    <About>
                        <h1>What is MSW?</h1>
                        <div className="about-text">
                            MetaSaga Warriors is a roguelike dungeon crawler FREE-TO-OWN
                            NFT game where you command a party of warriors (known as
                            Diggers) on a mission to stop the corruption that encroached
                            upon their paradise. These warriors, their parts, weapons, and
                            other equipment are non-fungible tokens.
                        </div>
                        <br />
                        <div className="about-text">
                            The game is being developed by MetaGaming Guild (MGG), a
                            community-governed organization which offers Game-Fi solutions
                            to thousands of players all around the globe. MetaSaga
                            Warriors will be launched as MGG’s flagship game offer.
                        </div>
                    </About>
                    <AboutImg>&nbsp;</AboutImg>
                </SectCont>
            </div>
        </>
    );
}
