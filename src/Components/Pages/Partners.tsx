import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';

const Card = styled.div`
    max-width: 20rem;
`;

const Content = styled.div<{ isMedScreen?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
`;

const App: React.FC<{ isScreen550: boolean }> = ({ isScreen550 }) => {
    return (
        <>
            <div className="page-section" id="partners">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className='titleCard' padding="2rem 4rem">
                        <h1>PARTNERS</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont
                    margin="5rem"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                      <Content>
                        <Card className="col-md-5 grow">
                        <a 
                            target="_blank"
                            href="https://nftb.io">
                        <img
                            src={require('../../Assets/img/partners/nftb_2.png')}
                            className=""
                            alt=""
                            width="200"
                            height="50"
                        />
                        </a>
                        </Card>
                        <Card className="col-md-5 grow">
                        <a 
                            target="_blank"
                            href="https://afkdao.io">
                        <img
                            src={require('../../Assets/img/partners/afk.png')}
                            className=""
                            alt=""
                            width="200"
                            height="50"
                        />
                        </a>
                        </Card>
                        <Card className="col-md-5 grow">
                        <a 
                            target="_blank"
                            href="https://tegro.com">
                        <img
                            src={require('../../Assets/img/partners/Tegro_Vertical.png')}
                            className=""
                            alt=""
                            width="200"
                            height="50"
                        />
                        </a>
                        </Card>
                        <Card className="col-md-5 grow">
                        <a 
                            target="_blank"
                            href="https://odyn.gg">
                        <img
                            src={require('../../Assets/img/partners/Odyn.png')}
                            className=""
                            alt=""
                            width="200"
                            height="50"
                        />
                        </a>
                        </Card>
                        <Card className="col-md-5 grow">
                        <a 
                            target="_blank"
                            href="https://simplio.io">
                        <img
                            src={require('../../Assets/img/partners/simplio_green_1024.png')}
                            className=""
                            alt=""
                            width="200"
                            height="50"
                        />
                        </a>
                        </Card>
                    </Content>
                
                </SectCont>
            </div>
        </>
    );
};

export default App;