import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Map from './Map'
import { useLoadScript } from "@react-google-maps/api";
import Header from './components/header';
import Profile from './components/profile';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [position, setPosition] = useState(null)

  const getLocation = () => { navigator.geolocation.getCurrentPosition(
    (position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
  )
  }
  console.log('position', position)

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_API
  });
  const [post, setPost] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/posts');
      setPost(res.data)
    }
    getLocation()
    getData()
  },[])

  console.log('LOGGED IN USER', user)
  console.log(post)
  return (
    <div className="App">
      <Header setUser={setUser} user={user}/>
    <Routes >
      <Route path='/' element={isLoaded && position && <Map post={post} position={position}/>} />
      {user && <Route path={`/users/:id`} element={<Profile user={user}/>}/>}
    </Routes>
    </div>
  );
}

export default App;
