import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';

export default function App() {
    return (
        <>
            <div className="page-section" id="gameplay">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard padding="2rem 4rem">
                        <h1>GAMEPLAY</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont margin="4rem">
                    <div className="col-md-5 grow">
                        <img
                            src={require('../../Assets/img/Bossraid_new.png')}
                            className=""
                            alt=""
                        />
                    </div>
                    <div className="col-md-5 grow">
                        <img
                            src={require('../../Assets/img/Dungeon_new.png')}
                            className=""
                            alt=""
                        />
                    </div>
                    <div className="col-md-5 grow">
                        <img
                            src={require('../../Assets/img/pvp.png')}
                            className=""
                            alt=""
                        />
                    </div>
                </SectCont>
            </div>
        </>
    );
}
