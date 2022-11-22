import React, {useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({user, setUser}) => {
  
const clientId = process.env.REACT_APP_API_GOOGLE_OAUTH_CLIENT_ID;

const navigate = useNavigate();

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
  await axios.post('/api/users', res.profileObj);
  setUser(res.profileObj);
};

const onFailure = (err) => {
  console.log('failed:', err);
};

const logOutSuccess = () => {
  navigate('/')
  setUser(null)
} 

return (
  <>
  {user 
  ? (<GoogleLogout 
  clientId={clientId} 
  buttonText="Log out"
  onLogoutSuccess={logOutSuccess}
  />)
  : 
  <GoogleLogin
  clientId={clientId}
  buttonText="Sign in"
  onSuccess={onSuccess}
  onFailure={onFailure}
  cookiePolicy={'single_host_origin'}
  isSignedIn={false}
  />}
</>
);

}

export default Login