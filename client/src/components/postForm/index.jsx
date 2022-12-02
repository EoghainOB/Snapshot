import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Geocode from 'react-geocode';
import './index.css';

const getLocation = (location) => {
    Geocode.setApiKey(process.env.REACT_APP_API_GOOGLE_API);
    return Geocode.fromLatLng(location?.lat, location?.lng).then(
    (response) => {
      return response.results[0].formatted_address;
    },
    (error) => {
      // console.error(error);
    }
  );
}

const PostForm = ({setPosts, position, user}) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();
  const [address, setAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return (<div className="container">
    <div className="everlib-logo">
    <i className="everlib-logo-first-bar"></i>
    <i className="everlib-logo-second-bar"></i>
    <i className="everlib-logo-third-bar"></i>
    <i className="everlib-logo-fourth-bar"></i>
    </div>
    </div>)
  }

  getLocation(position)?.then(data => setAddress(data));

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
    setIsLoading(true);
    const formData = new FormData();
    file.map(x => formData.append('file', x))
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', user.name);
    formData.append('googleId', user.googleId);
    formData.append('tags', tags);
    formData.append('location', JSON.stringify(position));
    formData.append('address', address);
    await axios.post('/api/posts', formData)
    const res = await axios.get('/api/posts');
    setPosts(res.data)
    navigate('/')
  }

  return (
    <form className='upload__form' >
      <label htmlFor='title'>Title</label>
      <input className='upload__input' id='title' type='text' onChange={changeTitleHandler} required/>
      <label htmlFor='description'>Description</label>
      <input className='upload__input' id='description' type='text' onChange={changeDescriptionHandler}/>
      <label htmlFor='tags'>Tags</label>
      <input className='upload__input' id='tags' type='text' placeholder='cats, dogs, ...' onChange={changeTagsHandler}/>
      <label htmlFor='selectFiles'>Select Files</label>
      <input className='upload__input' type='file' htmlFor='fileUpload' onChange={changeFileHandler} required multiple/>
      <button onSubmit={submitHandler} className='upload__submit__btn' id='fileUpload' type='submit' disabled={position ? false : true}>Submit</button>
      {!position && <p className='alert'>Please, share your location</p>}
    </form>
  )
}


export default PostForm