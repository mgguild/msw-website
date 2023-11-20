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
            <div className="page-section" id="gameplay">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className='titleCard' padding="2rem 4rem">
                        <h1 style={{ fontSize: '2rem' }}>GAMEPLAY</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont
                    margin="0"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Content>
                        <Card className="grow">
                            <img
                                src={require('../../Assets/img/Bossraid_new_new.png')}
                                className=""
                                alt=""
                            />
                        </Card>
                        <Card className="grow">
                            <img
                                src={require('../../Assets/img/Dungeon_newnew.png')}
                                className=""
                                alt=""
                            />
                        </Card>
                        <Card className="grow">
                            <img
                                src={require('../../Assets/img/Pvp_new_new.png')}
                                className=""
                                alt=""
                            />
                        </Card>
                    </Content>
                </SectCont>
            </div>
        </>
    );
};

export default App;
