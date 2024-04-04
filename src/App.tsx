import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, FC } from 'react';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import usePlayfab from './Hooks/usePlayfab';
import { DashboardExchange, DashboardGuilds, DashboardHome, DashboardMembership, DashboardRewards, DashboardSocial, DashboardWallet, DashboardLeaderboard } from './routes';
import {Navigation} from './Components/Dashboard'
import MarketplaceV2 from './Components/Marketplace/views/MarketplaceV2/Marketplace';
import Market from './Components/Marketplace/views/MarketplaceV2/Views/Market/Market';
import User from './Components/Marketplace/views/MarketplaceV2/Views/User';
import NFTPage from './Components/Marketplace/views/MarketplaceV2/Views/NFTPage';

const Main = lazy(() => import('./Components/Pages/Main'));
const AccountDelete = lazy(() => import('./Components/Pages/AccountDelete'));
const NotSameWallet = lazy(() => import('./Components/Pages/NotSameWallet/index'));
const AccVerified = lazy(() => import('./Components/Pages/AccountVerfied'));

function MainApp() {
    const [tab, setTab] = useState(0);
    const [isScreen1080, setIsScreen1080] = useState(false);
    const [isScreen800, setIsScreen800] = useState(false);
    const [isScreen550, setIsScreen600] = useState(false);
    const [open, setOpen] = useState(false);

    const connect = usePlayfab((state: any) => state.start);

    useEffect(() => {
        connect();
    }, [connect]);

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

const Dashboard: FC = () => (
  <div className='flex flex-col w-full'>
    <Navigation />
    <div className='mx-[5em] my-[5em]'>
      <Routes>
        <Route path="/" element={<DashboardRewards />} />
        <Route path="/rewards" element={<DashboardRewards />} />
        <Route path="/wallet" element={<DashboardWallet />} />
        <Route path="/exchange" element={<DashboardExchange />} />
        <Route path="/membership" element={<DashboardMembership />} />
        <Route path="/social" element={<DashboardSocial />} />
        <Route path="/guilds" element={<DashboardGuilds />} />
        <Route path="/leaderboards" element={<DashboardLeaderboard />} />
      </Routes>
    </div>
  </div>
)

const App = () => (
  <Routes>
    <Route path='/*' element={<MainApp />} />
    <Route path='/dashboard/*' element={<Dashboard />} />
  </Routes>
)

export default App;
