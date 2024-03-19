import React, { useState } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

interface userData {
    name: string;
    imageUrl: string;
}

export default function Authentciation() {
    const [user, setUser] = useState<userData | null>(null);

    const responseGoogle = (response: any) => {
        console.log(response);
        setUser(response.profileObj);
    };

    const onLoginFail = (res: any) => {
        console.log('LOGIN FAILED! res: ', res);
    };
    const onLogout = () => {
        setUser(null);
        console.log('Logout Succesfully!');
    };

    return (
        <div style={{ border: '1px solid red', textAlign: 'center' }}>
            {user ? (
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <img
                        src={user.imageUrl}
                        alt={user.name}
                        style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                    />
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                        buttonText="Logout"
                        onLogoutSuccess={onLogout}
                    />
                </>
            ) : (
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={onLoginFail}
                    cookiePolicy="single_host_origin"
                    isSignedIn
                />
            )}
        </div>
    );
}
