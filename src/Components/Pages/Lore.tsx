import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../Styled';
import { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const CarouselCont = styled.div`
    display: table-cell;
    width: 100%;
`;

const Scroll = styled.div`
    position: absolute;
    top: 0;
    padding: 5rem 8rem;
    color: black;

    p {
        font-size: 2.05rem;
        text-align: justify;

        @media (max-width: 1025px) {
            font-size: 1.75rem;
        }
    }
`;

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel showThumbs={false}>
                <div style={{ position: 'relative' }}>
                    <img src={require('../../Assets/img/scroll-left.png')} />
                    <Scroll>
                        <h1>THE BIG PULSE</h1>
                        <p>
                            Long ago, a crystal meteor crashed into our world. It crawled,
                            sank, and melded into the ground as if it were alive. The
                            comet radiated a pulse felt throughout the land, beckoning us.
                            We were in awe as we were afeared of this mysterious thing
                            from above. Those curious to touch the crystal suffered pain,
                            and many succumbed. After decades of research, we developed
                            the technology to stabilize, contain, and control the
                            crystals' energy to amplify our magic and power our world. We
                            established a cave system that stretched far and wide. For
                            centuries, we were happy and content in our home we named
                            Permafaria.
                        </p>
                    </Scroll>
                </div>
                <div>
                    <img src={require('../../Assets/img/scroll-right.png')} />
                    <Scroll>
                        <p>
                            Our knowledge of the arcane and the natural elements made our
                            civilization thrive, but our progress demanded more and more
                            of crystals. One day, we dug a little too deep. We hit the
                            core. With a single strike, it exploded a massive amount of
                            dreadful energy, reaching every corner of our paradise. It
                            brought monsters from other worlds and corrupted many of our
                            fellow digglers. Those of us who made it out found ourselves
                            fending off these abominations. For decades, we stood guard at
                            the entrance, never letting anything pass through. But the we
                            know the onslaught would go on forever unless we stop the
                            source of corruption. And so armed with magic, technology, and
                            weaponry powered by the crystal, we shall venture into the
                            caves and destroy the core once and for all.
                        </p>
                    </Scroll>
                </div>
            </Carousel>
        );
    }
}

export default function App() {
    return (
        <>
            <div className="page-section" id="lore">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard padding="3rem 6.5rem">
                        <h1>Lore</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont margin="auto" maxWidth="70rem">
                    <CarouselCont>
                        <DemoCarousel />
                    </CarouselCont>
                </SectCont>
            </div>
        </>
    );
}
