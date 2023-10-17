import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';
import classes from '../Data/Classes';
import React, { useState, useMemo } from 'react';

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    @media (max-width: 820px) { 
        flex: 7 0 25%;
    }
`;


const RowChar = styled.div`
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    margin-right: 4.5rem;
    margin-left: 4.5rem;
    gap: 2rem;
    justify-content: center;

    @media (max-width: 820px) { 
        margin-right: 2rem;
        margin-left: 8rem;
        gap: 3rem;
    }

    img {
        display: block;
        height: auto;
        max-width: 100%;
        width: 100%;
        object-fit: cover;

        @media (max-width: 820px) { 
            margin-right: 14rem;
            margin-left: -6rem;
        }
    }
    
   
`;

const ColumnChar = styled.div`
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
    gap: 1rem;
    justify-content: center;
`;

const NFTClasses = styled.div<{ isScreen575?: boolean }>`
    margin-top: 3rem;
    max-width: 65rem;
    align-self: center;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;

    @media (max-width: 575px) {
        max-height: 10rem;
        flex-flow: row wrap;
        overflow: scroll;
        max-width: 100%;
        gap: 0.37rem
    }
`;



const NFTClass = styled.div<{ img: string }>`
    position: relative;
    border: 5px solid #4acae8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #232959;
    border-radius: 10px;
    width: 160px;
    height: 133px;
    cursor: pointer;

    ${({ img }) =>
        img
            ? `
        &:before{
            z-index: 0;
            content: " ";
            position: absolute;
            opacity: 0.15;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-image: url(${require('../../Assets/img/diggers/' + img)});
        }
    `
            : ''}

    img {
        z-index: 2;
        width: 100px;
        height: 100px;
        margin-top: 5px;
        margin-bottom: 0px;
    }
`;

const StatRate: React.FC<{ count: number }> = ({ count }) => {
    var statRate: any = [];

    for (let index = 1; index <= 5; index++) {
        statRate.push(
            <span
                className={index <= count ? 'fa fa-star checked' : 'fa fa-star'}
                key={index}
            ></span>,
        );
    }

    return (
        <div style={{ display: 'flex', width: '100%', gap: '0.5rem' }} className="statRateContainer" >{statRate}</div>
    );
    
};

const App: React.FC<{ isScreen800: boolean; isScreen550: boolean }> = ({
    isScreen800,
    isScreen550,
}) => {
    const [selectedClass, setSelectedClass] = useState(0);
    const [isScreen575, setIsScreen575] = useState(false);

    const handleResize = () => {
        setIsScreen575(window.innerWidth < 650);
    };

    useMemo(() => {
        handleResize();
    }, []);

    return (
        <>
            <div className="page-section" id="nftCharacters">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className='titleCard' padding="2.5rem 2rem">
                        <h1>NFT Characters</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont margin="auto">
                    <Content>
                        {isScreen800 ? (
                            <ColumnChar>
                                <div>
                                    {
                                        <div key={selectedClass}>
                                            <h1 className="animate__animated animate__fadeInDown">
                                                {classes[selectedClass].name}
                                            </h1>
                                            <br />
                                            <p
                                                className="animate__animated animate__fadeInUp"
                                                style={{ textAlign: 'justify' }}
                                            >
                                                {classes[selectedClass].description}
                                            </p>
                                        </div>
                                    }
                                </div>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                    }}
                                >
                                    <img
                                        src={require(`../../Assets/img/cards/${classes[selectedClass].images.stock}`)}
                                        className="filter-shadow  "
                                        alt="..."
                                    />
                                    <img
                                        src={require(`../../Assets/img/cards/${classes[selectedClass].images.legendary}`)}
                                        className="filter-shadow "
                                        alt="..."
                                    />
                                </div>
                                <div
                                    key={selectedClass}
                                    style={{
                                        display: 'flex',
                                        flexFlow: 'row wrap',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '2rem',
                                    }}
                                >
                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0' }}>
                                            Physical Damage
                                        </p>
                                        <StatRate
                                            count={classes[selectedClass].stat.dmg}
                                        />
                                    </div>

                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0' }}>
                                            Attack Speed
                                        </p>
                                        <StatRate
                                            count={classes[selectedClass].stat.atkspd}
                                        />
                                    </div>

                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0' }}>
                                            Skill Damage
                                        </p>
                                        <StatRate
                                            count={classes[selectedClass].stat.dmgSk}
                                        />
                                    </div>

                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0' }}>Health</p>
                                        <StatRate
                                            count={classes[selectedClass].stat.hp}
                                        />
                                    </div>

                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0' }}>Utility</p>
                                        <StatRate
                                            count={classes[selectedClass].stat.util}
                                        />
                                    </div>
                                </div>
                            </ColumnChar>
                        ) : (
                            <RowChar>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        flex: '0 0 25%',
                                        maxWidth: '25%',
                                    }}
                                >
                                    <img
                                        src={require(`../../Assets/img/cards/${classes[selectedClass].images.stock}`)}
                                        className="filter-shadow  "
                                        alt="..."
                                    />
                                    <img
                                        src={require(`../../Assets/img/cards/${classes[selectedClass].images.legendary}`)}
                                        className="filter-shadow "
                                        alt="..."
                                    />
                                </div>
                                <div
                                    style={{
                                        flex: '0 0 33.3333333333%',
                                        maxWidth: '33.3333333333%',
                                    }}
                                >
                                    {
                                        <div key={selectedClass}>
                                            <h1 className="animate__animated animate__fadeInDown">
                                                {classes[selectedClass].name}
                                            </h1>
                                            <br />
                                            <p
                                                className="animate__animated animate__fadeInUp"
                                                style={{ textAlign: 'justify' }}
                                            >
                                                {classes[selectedClass].description}
                                            </p>
                                        </div>
                                    }
                                </div>
                                <div
                                    key={selectedClass}
                                    style={{
                                        flex: '0 0 16.6666666667%',
                                        padding: '0%',
                                    }}
                                    className='stats'
                                >
                                    <p style={{ margin: '0 0 0.5rem 0' }}>
                                        Physical Damage
                                    </p>
                                    <StatRate count={classes[selectedClass].stat.dmg} />
                                    <br /> <br />
                                    <p style={{ margin: '0 0 0.5rem 0' }}>Attack Speed</p>
                                    <StatRate
                                        count={classes[selectedClass].stat.atkspd}
                                    />
                                    <br /> <br />
                                    <p style={{ margin: '0 0 0.5rem 0' }}>Skill Damage</p>
                                    <StatRate count={classes[selectedClass].stat.dmgSk} />
                                    <br /> <br />
                                    <p style={{ margin: '0 0 0.5rem 0' }}>Health</p>
                                    <StatRate count={classes[selectedClass].stat.hp} />
                                    <br /> <br />
                                    <p style={{ margin: '0 0 0.5rem 0' }}>Utility</p>
                                    <StatRate count={classes[selectedClass].stat.util} />
                                </div>
                            </RowChar>
                        )}

                        <NFTClasses className="classes" isScreen575={isScreen575}>
                            {classes.map((nft, index) => {
                                return (
                                    <>
                                        <NFTClass
                                            onClick={() => {
                                                setSelectedClass(index);
                                            }}
                                            className={`NFTClasses ${
                                                selectedClass === index
                                                    ? 'active'
                                                    : 'grow'
                                            }`}
                                            img={nft.images.icon}
                                            key={index}
                                            style={{
                                                flexShrink: isScreen575 ? 0 : 1,
                                            }}
                                        >
                                            <img
                                                src={require(`../../Assets/img/diggers/${nft.images.icon}`)}
                                            />
                                        </NFTClass>
                                    </>
                                );
                            })}
                        </NFTClasses>
                    </Content>
                </SectCont>
            </div>
        </>
    );
};

export default App;
