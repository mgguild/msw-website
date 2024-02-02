import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer/';
import { ThirdwebProvider } from '@thirdweb-dev/react';

window.Buffer = window.Buffer || Buffer;

const activeChain = 'polygon';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App />);

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <ThirdwebProvider
        activeChain={activeChain}
        clientId={process.env.REACT_APP_CLIENT_ID}
    >
        <HashRouter>
            <App />
        </HashRouter>
    </ThirdwebProvider>,
    // </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
