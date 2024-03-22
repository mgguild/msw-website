import styled from 'styled-components';
import { SectHdr, SectCont } from '../../../Styled';
import { useState, useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import React from 'react';

const TitleCard = styled.div<{ padding?: string }>`
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(255, 255, 255, 0);
    -webkit-background-clip: border-box;
    background-clip: border-box;
    padding: ${({ padding }) => padding ?? `2rem 4rem`};
    border: 0rem solid rgba(0, 0, 0, 0.125);
    border-radius: 0rem;
    background-image: url(${require('../../../../Assets/img/tiles.png')});
    background-size: cover;
    background-position: center;

    @media (max-width: 721px) {
        padding: 2rem 5rem !important;

        h1 {
            font-size: 2.5rem !important;
        }
    }

    @media (max-width: 440px) {
        padding: 2rem 5rem !important;
        h1 {
            font-size: 2.5rem !important;
        }
    }
`;

const CustomCarousel = styled(Carousel)`
    .control-arrow {
        background-color: transparent;
    }

    .control-arrow:before {
        color: #ffffff;
        font-size: 50px;

        @media (max-width: 800px) {
            font-size: 40px;
        }
        @media (max-width: 575px) {
            font-size: 50px;
        }

        @media (max-width: 375px) {
            font-size: 50px;
        }
    }

    .control-prev.control-arrow:before {
        content: '🞀';
    }

    .control-next.control-arrow:before {
        content: '🞂';
    }
`;

const CarouselCont = styled.div`
    display: table-cell;
    width: 100%;
`;

const Scroll = styled.div<{ isScreen800?: boolean }>`
    position: absolute;
    top: 40px;
    padding: ${({ isScreen800 }) => (isScreen800 ? '48% 2rem 2em 2rem' : '4%')};
    color: white;
    width: 60%;

    h1 {
        font-size: 80px;
        color: #ecb602;

        @media (max-width: 1025px) {
            font-size: 45px;
        }

        //ipad Air
        @media (max-width: 820px) {
            font-size: 38px;
            width: 22rem;
        }

        @media (max-width: 800px) {
            font-size: 80px;
            width: 45.3rem;
        }

        @media (max-width: 500px) {
            font-size: 45px;
            width: 22rem;
        }

        @media (max-width: 390px) {
            font-size: 45px;
            width: 21rem;
        }
        @media (max-width: 320px) {
            font-size: 35px;
            width: 16rem;
        }
    }

    p {
        font-size: 1.89rem;
        text-align: center;

        @media (max-width: 1440px) {
            font-size: 1.82rem;
            text-align: center;
            font-family: 'Mustica Pro';
        }

        // ipad pro
        @media (max-width: 1024px) {
            font-size: 1.25rem;
            text-align: center;
        }

        // ipad air
        @media (max-width: 820px) {
            font-size: 0.9rem;
            width: 22rem;
            padding-top: 0px;
        }

        // ipad mini
        @media (max-width: 800px) {
            font-size: 2.2rem;
            width: 44rem;
            padding-top: 55px;
        }

        @media (max-width: 500px) {
            font-size: 1.14rem;
            width: 22rem;
            padding-top: 0px;
        }

        @media (max-width: 390px) {
            font-size: 16.6px;
            width: 20rem;
        }

        @media (max-width: 320px) {
            font-size: 12.6px;
            width: 16rem;
        }
    }
`;

const DemoCarousel: React.FC<{ isScreen800: boolean; isScreen650: boolean }> = ({
    isScreen800,
    isScreen650,
}) => {
    return (
        <Carousel
            showThumbs={false}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
        >
            <div style={{ position: 'relative' }}>
                <img
                    src={require(`../../../../Assets/img/${
                        isScreen800
                            ? isScreen650
                                ? 'mobile_lore_sm.png'
                                : 'mobile_lore_sm.png'
                            : 'lore.jpg'
                    }`)}
                />
                <Scroll isScreen800={isScreen800}>
                    <h1 style={{ padding: '0 0 1rem 0' }}>THE BIG PULSE</h1>
                    <p>
                        Long ago, a crystal meteor crashed into our world. It crawled,
                        sank, and melded into the ground as if it were alive. The comet
                        radiated a pulse felt throughout the land, beckoning us. We were
                        in awe as we were afeared of this mysterious thing from above.
                        Those curious to touch the crystal suffered pain, and many
                        succumbed. After decades of research, we developed the technology
                        to stabilize, contain, and control the crystals' energy to amplify
                        our magic and power our world. We established a cave system that
                        stretched far and wide. For centuries, we were happy and content
                        in our home we named Permafaria.
                    </p>
                </Scroll>
            </div>
            <div>
                <img
                    src={require(`../../../../Assets/img/${
                        isScreen800
                            ? isScreen650
                                ? 'mobile_lore2_sm.png'
                                : 'mobile_lore2_sm.png'
                            : 'lore_2.png'
                    }`)}
                />
                <Scroll isScreen800={isScreen800}>
                    <p className="second">
                        Our knowledge of the arcane and the natural elements made our
                        civilization thrive, but our progress demanded more and more of
                        crystals. One day, we dug a little too deep. We hit the core. With
                        a single strike, it exploded a massive amount of dreadful energy,
                        reaching every corner of our paradise. It brought monsters from
                        other worlds and corrupted many of our fellow digglers. Those of
                        us who made it out found ourselves fending off these abominations.
                        For decades, we stood guard at the entrance, never letting
                        anything pass through. But the we know the onslaught would go on
                        forever unless we stop the source of corruption. And so armed with
                        magic, technology, and weaponry powered by the crystal, we shall
                        venture into the caves and destroy the core once and for all.
                    </p>
                </Scroll>
            </div>
        </Carousel>
    );
};

const App: React.FC<{ isScreen800: boolean }> = ({ isScreen800 }) => {
    const [isScreen650, setIsScreen650] = useState(false);

    const handleResize = () => {
        setIsScreen650(window.innerWidth < 650);
    };

    useMemo(() => {
        handleResize();
    }, []);

    return (
        <>
            <div className="page-section" id="lore" style={{ padding: '0' }}>
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className="titleCard" padding="3rem 6.5rem">
                        <h1 style={{ fontSize: '2.2rem' }}>Lore</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont margin="0">
                    <CarouselCont>
                        <DemoCarousel
                            isScreen800={isScreen800}
                            isScreen650={isScreen650}
                        />
                    </CarouselCont>
                </SectCont>
            </div>
        </>
    );
};

export default App;
