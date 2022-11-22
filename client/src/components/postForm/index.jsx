import React, {useState} from 'react'
import axios from 'axios'

const PostForm = ({position, user}) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();

  const changeFileHandler = (e) => {
    setFile(e.target.files[0])
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
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', user.name);
    formData.append('tags', tags);
    formData.append('location', JSON.stringify(position));
    await axios.post('/api/posts', formData)
    console.log(formData, title, description, tags)
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='title'>Title</label>
      <input id='title' type='text' onChange={changeTitleHandler}/>
      <label htmlFor='description'>Description</label>
      <input id='description' type='text' onChange={changeDescriptionHandler}/>
      <label htmlFor='tags'>Tags</label>
      <input id='tags' type='text' placeholder='cats, dogs, ...' onChange={changeTagsHandler}/>
      <input type='file' onChange={changeFileHandler} required/>
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