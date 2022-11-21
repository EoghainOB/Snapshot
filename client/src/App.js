import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  const [post, setPost] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/hello');
      setPost(res.data)
    }

    getData()
  },[])
  return (
    <div className="App">
      <p>{post}</p>
    </div>
  );
}

export default App;
