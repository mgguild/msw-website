import './App.css';
import { useMemo, useState, useRef, useEffect } from 'react';
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
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ToastContainer, toast } from 'react-toastify';
import usePlayfab from './Hooks/usePlayfab';

gsap.registerPlugin(ScrollTrigger);

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

const AppNav = styled.div`
    font-family: 'Alphakind', cursive;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 10;
    flex-flow: row nowrap;
    gap: 0.8rem;
`;

const MobileHeader = styled.div`
    width: 100%;
    display: flex;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    align-items: center;
    background-color: #2d3e4c;
    font-family: VT323, monospace;

    @media (max-width: 764px) and (min-width: 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
    }
`;

const { chains, publicClient } = configureChains(
    [polygon],
    [
        alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID ?? '' }),
        publicProvider(),
    ],
);

// const config = createConfig(
//     getDefaultConfig({
//         // Required API Keys
//         alchemyId: process.env.REACT_APP_ALCHEMY_ID, // or infuraId
//         walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? '',

//         // Required
//         appName: 'MetaSaga Warriors',

//         // Optional
//         appDescription: 'Your App Description',
//     }),
// );

const config = createConfig({
    connectors: [new InjectedConnector({ chains })],
    publicClient,
});

function App() {
    const [tab, setTab] = useState(0);
    const [isScreen1045, setIsScreen1045] = useState(false);
    const [isScreen764, setIsScreen764] = useState(false);
    const [isScreen600, setIsScreen600] = useState(false);

    const connect = usePlayfab((state: any) => state.start);
    const user = usePlayfab((state: any) => state.user);

    const navBtns = useRef<any | HTMLElement[]>([]);

    const sections = [
        <Home />,
        <About />,
        <Gameplay />,
        <Lore />,
        <NFTs />,
        <Gallery />,
        <FAQ />,
        <Team />,
        <Footer />,
    ];

    const handleResize = () => {
        setIsScreen1045(window.innerWidth < 1045);
        setIsScreen764(window.innerWidth < 764);
        setIsScreen600(window.innerWidth < 600);
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

    const ScrollToSection = (e: any, index: any) => {
        e.preventDefault();
        navBtns.current[index]?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    const Navigation = () => {
        return (
            <AppNav className="NavBtns">
                {navItems.map((item, i) => (
                    <a className="NavButton" onClick={e => ScrollToSection(e, i)}>
                        {item}
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
                            <div className="Header-content">
                                <LogoContainer>
                                    <img
                                        src={require('./Assets/img/MSW_Logo_header2.png')}
                                        alt=""
                                    />
                                </LogoContainer>
                                {Navigation()}
                                <div>{user ? <UserDashboard /> : <LoginRegister />}</div>
                            </div>
                        </div>

                        <Container>
                            <div
                                className="AppContainer"
                                style={{ width: '100%', margin: '6rem 0 0 0' }}
                            >
                                {sections.map((section, i) => (
                                    <div ref={el => navBtns.current.push(el)}>
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
