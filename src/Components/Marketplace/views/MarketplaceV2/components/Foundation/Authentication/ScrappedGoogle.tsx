import React, { useState } from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'

export default function Authentciation() {
  const [user, setUser] = useState(null)

  const responseGoogle = (response) => {
    console.log(response)
    setUser(response.profileObj)
  }

  const onLoginFail = (res) => {
    console.log('LOGIN FAILED! res: ', res)
  }
  const onLogout = () => {
    setUser(null)
    console.log('Logout Succesfully!')
  }

  return (
    <div style={{ border: '1px solid red', textAlign: 'center' }}>
      {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <img src={user.imageUrl} alt={user.name} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onLogout}
          />
        </>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={onLoginFail}
          cookiePolicy="single_host_origin"
          isSignedIn
        />
      )}
    </div>
  )
}
