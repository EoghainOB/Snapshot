import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Geocode from 'react-geocode';

const getLocation = (location) => {
    Geocode.setApiKey(process.env.REACT_APP_API_GOOGLE_API);
    return Geocode.fromLatLng(location.lat, location.lng).then(
    (response) => {
      return response.results[0].formatted_address;
    },
    (error) => {
      console.error(error);
    }
  );
}

const PostForm = ({setPosts, position, user}) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();
  const [address, setAddress] = useState(null)

  const navigate = useNavigate();

  getLocation(position).then(data => setAddress(data));

  const changeFileHandler = (e) => {
    setFile(Object.values(e.target.files))
  }
  
  const changeTitleHandler = (e) => {
    setTitle(e.target.value)
  }

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  const changeTagsHandler = (e) => {
    setTags(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    file.map(x => formData.append('file', x))
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', user.name);
    formData.append('tags', tags);
    formData.append('location', JSON.stringify(position));
    formData.append('address', address);
    await axios.post('/api/posts', formData)
    const res = await axios.get('/api/posts');
    setPosts(res.data)
    navigate('/')
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='title'>Title</label>
      <input id='title' type='text' onChange={changeTitleHandler} required/>
      <label htmlFor='description'>Description</label>
      <input id='description' type='text' onChange={changeDescriptionHandler}/>
      <label htmlFor='tags'>Tags</label>
      <input id='tags' type='text' placeholder='cats, dogs, ...' onChange={changeTagsHandler}/>
      <input type='file' onChange={changeFileHandler} required multiple/>
      <button type='submit'>Submit</button>
    </form>
  )
}

/* 
const Form = () => {
    const [file, setFile] = useState();

    const changeInput = (e) => {
        setFile(e.target.files[0]);
    }

    const postImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post('/api/upload', formData)
    }

  return (
    <>
    <form onSubmit={postImage}>
        <input onChange={changeInput} type="file"/>
        <button type='submit'>Submit</button>
    </form>
    </>
  )
}
*/


export default PostForm