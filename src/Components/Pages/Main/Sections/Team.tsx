import { useState, useMemo, useEffect } from 'react';
import { SectHdr, TitleCard, SectCont } from '../../../Styled';
import styled from 'styled-components';
import team from '../../../Data/team';

const BG = styled.div`
    background-image: url(${require('../../../../Assets/img/stalactite1.png')}),
        url(${require('../../../../Assets/img/stalactite2.png')}),
        url(${require('../../../../Assets/img/crystal1.png')}),
        url(${require('../../../../Assets/img/crystal2.png')});
    background-repeat: no-repeat;
    background-size: 20%, 20%, 30%, 30%;
    background-position: bottom left, bottom right, bottom right, bottom left;

    padding: 2rem;
    font-family: 'Alphakind', cursive;

    @media (max-width: 520px) {
        padding: 0.5rem;
    }

    @media (max-width: 406px) {
        padding: 0.5rem;
    }
`;

const ProfileImg = styled.div<{ bgImg: string }>`
    display: flex;
    ${({ bgImg }) =>
        bgImg
            ? `
         background-image: url(${require('../../../../Assets/img/teams/' + bgImg)});
    `
            : ''}

    background-size: contain;
    background-repeat: no-repeat;

    img {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
        -moz-transition: opacity 0.3s ease-in-out;
        -webkit-transition: opacity 0.3s ease-in-out;

        &:hover {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            -moz-transition: opacity 0.3s ease-in-out;
            -webkit-transition: opacity 0.3s ease-in-out;
        }
    }
`;

const Img = styled.img`
    max-width: 10rem;

    @media (max-width: 900px) {
        max-width: 8rem;
    }
    @media (max-width: 500px) {
        max-width: 6rem;
    }
`;

const Desc = styled.div`
    max-width: 12rem;

    @media (max-width: 900px) {
        font-size: 1rem;
        max-width: 10rem;
    }
`;

const TeamProfile = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    text-align: center;
    line-height: 1.8rem;
    min-width: 11rem;
    max-width: 12rem;

    @media (max-width: 413px) {
        min-width: 8rem;
        max-width: 8rem;
    }

    @media (max-width: 741px) {
        line-height: 1.3rem;
    }
`;

const Profile: React.FC<{ bgImg: string; img: string; name: string; role: string }> = ({
    bgImg,
    img,
    name,
    role,
}) => {
    return (
        <>
            <TeamProfile>
                <ProfileImg bgImg={bgImg}>
                    <Img src={require(`../../../../Assets/img/teams/${img}`)} />
                </ProfileImg>
                <Desc>
                    <div>{name}</div>
                    <div style={{ fontFamily: "'Mustica Pro', sans-serif" }}>{role}</div>
                </Desc>
            </TeamProfile>
        </>
    );
};

export default function App() {
    var count = 0;
    const [isScreen800, setIsScreen800] = useState(false);
    const [sequence, setSequence] = useState([3, 7, 10]);

    const handleResize = () => {
        if (window.innerWidth < 800) {
            setSequence([10]);
        } else {
            setSequence([2, 6, 10]);
        }
    };

    useMemo(() => {
        handleResize();
    }, []);

    return (
        <>
            <BG className="page-section" id="team">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className="titleCard" padding="2rem 6.5rem">
                        <h1 style={{ fontSize: '2.2rem' }}>Team</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont margin="auto" display="block">
                    {sequence.map((num, i) => {
                        const row: any = [];
                        for (let j = count; j < num; j++) {
                            row.push(
                                <Profile
                                    bgImg={team[j].bgImg}
                                    img={team[j].img}
                                    name={team[j].name}
                                    role={team[j].role}
                                    key={count}
                                />,
                            );
                            count++;
                        }
                        return (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '2rem',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '0 0 2rem 0    ',
                                }}
                            >
                                {row}
                            </div>
                        );
                    })}
                </SectCont>
            </BG>
        </>
    );
}
