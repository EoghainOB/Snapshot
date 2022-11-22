import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Map from './Map'
import { useLoadScript } from "@react-google-maps/api";
import Header from './components/header';

function App() {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_API
  });
  const [post, setPost] = useState('');
  const [login, setLogin] = useState(false);

  const loginHandler = () => setLogin(prev => !prev);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/posts');
      setPost(res.data)
    }
    getData()
  },[])
  
  console.log(post)
  return (
    <div className="App">
      <Header login={login} loginHandler={loginHandler}/>
      {isLoaded && <Map post={post} />}
    </div>
  );
}

export default App;
