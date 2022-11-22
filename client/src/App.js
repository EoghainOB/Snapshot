import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Map from './Map'
import { useLoadScript } from "@react-google-maps/api";
import Header from './components/header';
import Profile from './components/profile';
import PostForm from './components/postForm';
import { Routes, Route } from "react-router-dom";

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

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_API
  });
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/posts');
      setPosts(res.data)
    }
    getLocation()
    getData()
  },[])

  return (
    <div className="App">
      <Header setUser={setUser} user={user}/>
    <Routes >
      <Route path='/' element={isLoaded && position && <Map posts={posts} position={position}/>} />
      {user && <Route path={`/users/:id`} element={<Profile user={user}/>}/>}
      {user && <Route path={`/post`} element={<PostForm user={user} position={position}/>}/>}
    </Routes>
    </div>
  );
}

export default App;
