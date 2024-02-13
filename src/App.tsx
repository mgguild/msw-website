import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import  Main from './Components/Pages/Main';
// import AccountDelete from './Components/Pages/AccountDelete'

const Main = lazy(() => import('./Components/Pages/Main'));
const AccountDelete = lazy(() => import('./Components/Pages/AccountDelete'));
// const MarketPlace = lazy(() => import('@mgguild/marketplace-v2').then(module => {
//     return {default: module.Marketplace}
// }))


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
                {/* <Route
                    path="/marketplace"
                    element={
                        <Suspense fallback={<>...</>}>
                           <MarketPlace />
                        </Suspense>
                    }
                /> */}
            </Routes>
        </>
    );
}

export default App;
