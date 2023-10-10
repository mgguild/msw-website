import './App.css';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useSpring, animated, useSpringRef } from '@react-spring/web';
import {
    Home,
    About,
    Gameplay,
    Lore,
    NFTs,
    Gallery,
    FAQ,
    Team,
    Footer,
} from './Components/Pages';
import { LoginRegister, UserDashboard } from './Components/Modals';
import navItems from './Components/Data/NavItems';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ToastContainer, toast } from 'react-toastify';
import usePlayfab from './Hooks/usePlayfab';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Container = styled.div`
    position: relative;
    display: flex;
`;

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 1rem;

    img {
        max-width: 5rem;
    }
`;

const LogoContainerC = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 1rem;

    img {
        max-width: 5rem;
    }
`;

const AppNav = styled.div<{ isHorz?: boolean }>`
    font-family: 'Alphakind', cursive;
    display: flex;
    text-align: center;
    align-items: ${({ isHorz }) => (isHorz ? 'end' : 'center')};
    justify-content: center;
    font-size: 1.2rem;
    z-index: 10;
    flex-flow: ${({ isHorz }) => (isHorz ? 'column wrap' : 'row nowrap')};
    gap: 0.8rem;
`;

const AppNavHorz = styled.div`
    font-family: 'Alphakind', cursive;
    display: flex;
    text-align: center;
    align-items: end;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 10;
    flex-flow: column wrap;
    gap: 0.8rem;
`;

const MobileHeader = styled.div`
    width: 100%;
    display: flex;
    position: relative;
`;

const BurgerBtnC = styled.div`
    position: absolute;
    right: -1px;
    padding: 0rem 1rem;
`;

const BurgerBtn = styled.button`
    padding: 1rem;
    background: #17a2b8;
    border-radius: 10px;
`;

const HorzNav = styled(animated.div)`
    position: absolute;
    background-color: #0f0015;
    color: white;
    top: 6.4rem;
    right: 0;
    padding: 1rem 3rem 1rem 5rem;
    height: 100vh;
`;

const { chains, publicClient } = configureChains(
    [polygon],
    [
        alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID ?? '' }),
        publicProvider(),
    ],
);

const config = createConfig({
    connectors: [new InjectedConnector({ chains })],
    publicClient,
});

function App() {
    const [tab, setTab] = useState(0);
    const [isScreen1080, setIsScreen1080] = useState(false);
    const [isScreen800, setIsScreen800] = useState(false);
    const [isScreen550, setIsScreen600] = useState(false);
    const [open, setOpen] = useState(false);

    const connect = usePlayfab((state: any) => state.start);
    const user = usePlayfab((state: any) => state.user);

    const navBtns = useRef<any | HTMLElement[]>([]);

    const sections = [
        <Home isScreen550={isScreen550} />,
        <About isScreen800={isScreen800} />,
        <Gameplay isScreen550={isScreen550} />,
        <Lore isScreen800={isScreen800} />,
        <NFTs isScreen800={isScreen800} isScreen550={isScreen550} />,
        <Gallery isScreen550={isScreen550} />,
        <FAQ />,
        <Team />,
        <Footer />,
    ];

    const handleResize = () => {
        setIsScreen1080(window.innerWidth < 1045);
        setIsScreen800(window.innerWidth < 800);
        setIsScreen600(window.innerWidth < 550);
    };

    useMemo(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        connect();

        const sections: any[] = gsap.utils.toArray('.page-section');
        const NavButtons: any[] = gsap.utils.toArray('.NavButton');

        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
                toggleClass: {
                    className: 'active',
                    targets: NavButtons[i],
                },
            });
        });
    }, []);

    const props = useSpring({
        transform: open ? 'translate(0%, 0)' : 'translate(100%, 0)',
    });

    const ScrollToSection = (e: any, id: string, index: any) => {
        e.preventDefault();
        gsap.to(window, {duration: 0.5, scrollTo: {y: `#${id}`, offsetY:70}})
    };

    const Navigation = () => {
        return (
            <AppNav className="NavBtns" isHorz={isScreen1080}>
                {navItems.map((item, i) => (
                    <a className="NavButton" key={i} onClick={e => ScrollToSection(e, item.id, i)}>
                        {item.name}
                    </a>
                ))}
                <a>View Collection</a>
            </AppNav>
        );
    };

    return (
        <>
            <div className="App">
                <WagmiConfig config={config}>
                    <ConnectKitProvider theme="auto">
                        <div className="Header-bar fixed-top">
                            {!isScreen1080 ? (
                                <>
                                    <div className="Header-content">
                                        <LogoContainer>
                                            <img
                                                src={require('./Assets/img/MSW_Logo_header2.png')}
                                                alt=""
                                            />
                                        </LogoContainer>
                                        {Navigation()}
                                        <div style={{ padding: '0 1rem' }}>
                                            {user ? <UserDashboard /> : <LoginRegister />}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <MobileHeader>
                                        <LogoContainerC>
                                            <img
                                                src={require('./Assets/img/MSW_Logo_header2.png')}
                                                alt=""
                                            />
                                        </LogoContainerC>
                                        <BurgerBtnC>
                                            <BurgerBtn
                                                onClick={() => {
                                                    setOpen(!open);
                                                }}
                                            >
                                                <i className="fab fa fa-bars"></i>
                                            </BurgerBtn>
                                        </BurgerBtnC>
                                    </MobileHeader>
                                    <HorzNav style={props}>
                                        <div style={{ paddingBottom: '2rem' }}>
                                            {user ? <UserDashboard /> : <LoginRegister />}
                                        </div>
                                        {Navigation()}
                                    </HorzNav>
                                </>
                            )}
                        </div>

                        <Container>
                            <div
                                className="AppContainer"
                                style={{ width: '100%', margin: '6rem 0 0 0' }}
                            >
                                {sections.map((section, i) => (
                                    <div key={i} ref={el => navBtns.current.push(el)}>
                                        {section}
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </ConnectKitProvider>
                </WagmiConfig>
                <ToastContainer theme="dark" />
            </div>
        </>
    );
}

export default App;
