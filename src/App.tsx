import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Main = lazy(() => import('./Components/Pages/Main'));
const AccountDelete = lazy(() => import('./Components/Pages/AccountDelete'));
const Marketplace = lazy(() => import('./Components/Marketplace/views/MarketplaceV2'));
const UserPage = lazy(() => import('./Components/Marketplace/views/MarketplaceV2/Views/User'))
const NFTMarket = lazy(() => import('./Components/Marketplace/views/MarketplaceV2/Views/Market/Market'))



function App() {
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
                <Route
                    path="/marketplace"
                    element={
                        <Suspense fallback={<>...</>}>
                           <Marketplace />
                        </Suspense>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Suspense fallback={<>...</>}>
                           <UserPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/NFTMarket"
                    element={
                        <Suspense fallback={<>...</>}>
                           <NFTMarket />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
