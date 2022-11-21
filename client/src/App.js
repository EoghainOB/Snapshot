import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
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
      <p>HELLO</p>
    </div>
  );
}

export default App;
