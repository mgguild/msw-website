import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import usePlayfab from './Hooks/usePlayfab';
import MarketplaceV2 from './Components/Marketplace/views/MarketplaceV2/Marketplace';
import Market from './Components/Marketplace/views/MarketplaceV2/Views/Market/Market';
import User from './Components/Marketplace/views/MarketplaceV2/Views/User';
import NFTPage from './Components/Marketplace/views/MarketplaceV2/Views/NFTPage';

const Main = lazy(() => import('./Components/Pages/Main'));
const AccountDelete = lazy(() => import('./Components/Pages/AccountDelete'));
const NotSameWallet = lazy(() => import('./Components/Pages/NotSameWallet/index'));
const AccVerified = lazy(() => import('./Components/Pages/AccountVerfied'));

function App() {
    const connect = usePlayfab((state: any) => state.start);

    useEffect(() => {
        connect();
    }, []);

    return (
        <>
            <ToastContainer theme="dark" />
            <Routes>
                <Route
                    index
                    path="/"
                    element={
                        <Suspense fallback={<>...</>}>
                            <Main />
                        </Suspense>
                    }
                />
                <Route
                    path="account/delete"
                    element={
                        <Suspense fallback={<>...</>}>
                            <AccountDelete />
                        </Suspense>
                    }
                />
                <Route path="/marketplace" element={<MarketplaceV2 />} />
                <Route path="/marketplace/profile" element={<User />} />
                <Route path="/marketplace/NFT" element={<Market />} />
                <Route path="/marketplace/NFT/:id/:lid" element={<NFTPage />} />
                <Route
                    path="/WalletError"
                    element={
                        <Suspense fallback={<>...</>}>
                            <NotSameWallet />
                        </Suspense>
                    }
                />
                <Route
                    path="/AccountVerified"
                    element={
                        <Suspense fallback={<>...</>}>
                            <AccVerified />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
