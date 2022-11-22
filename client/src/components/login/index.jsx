import React, {useEffect} from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

const Login = ({login, loginHandler}) => {
  
const clientId = process.env.REACT_APP_API_GOOGLE_OAUTH_CLIENT_ID;

useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);

});
const onSuccess = async(res) => {
  // const response = await axios.get(`/api/users/${res.profileObj.googleId}`)
  
  await axios.post('/api/users', res.profileObj)

  await loginHandler();
};

const onFailure = (err) => {
  console.log('failed:', err);
};

return (
 <GoogleLogin
    clientId={clientId}
    buttonText={login ? "Sign out" : "Sign in"}
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={false}
/>
);
}

export default Login