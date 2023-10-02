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

const AboutImg = styled.div<{ isMedScreen?: boolean }>`
    background-image: url(${require('../../Assets/img/about_img.png')});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    ${({ isMedScreen }) => (isMedScreen ? `
        height: 15rem;
    ` : 'flex: 1;')};;
`;

const Content = styled.div<{ isMedScreen?: boolean }>`
    display: flex;
    flex-flow: ${({ isMedScreen }) => (isMedScreen ? 'column wrap' : 'row wrap')};
    gap: 1rem;
    max-width: 53rem;
    align-self: center;
`

const App: React.FC<{ isScreen800: boolean }> = ({
    isScreen800,
}) => {
    return (
        <>
            <div className="page-section" id="about">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard>
                        <h1>ABOUT</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont display='flex' margin='0' style={{flexFlow: 'column nowrap'}}>
                    <h1 style={{textAlign: 'center'}}>What is MSW?</h1>
                    <Content isMedScreen={isScreen800}>
                        { isScreen800 ?
                            <>
                                <AboutImg isMedScreen={isScreen800}>&nbsp;</AboutImg>
                                <About>
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
                            </>
                            :
                            <>
                                <About>
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
                                <AboutImg isMedScreen={isScreen800}>&nbsp;</AboutImg>
                            </>
                        }
                    </Content>
                </SectCont>
            </div>
        </>
    );
}

export default App;