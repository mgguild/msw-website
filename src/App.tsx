import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import  Main from './Components/Pages/Main';
// import AccountDelete from './Components/Pages/AccountDelete'

const Main = lazy(() => import('./Components/Pages/Main'));
const AccountDelete = lazy(() => import('./Components/Pages/AccountDelete'));

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
            </Routes>
        </>
    );
}

export default App;
