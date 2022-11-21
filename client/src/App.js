import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Map from './Map'
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_API
  });
  const [post, setPost] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/users');
      setPost(res.data)
    }

    getData()
  },[])
  
  console.log(post)
  return (
    <div className="App">
      {isLoaded && <Map post={post} />}
      
      <p>HELLO</p>
    </div>
  );
}

export default App;
