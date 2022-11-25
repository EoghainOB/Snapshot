import React from 'react'
import axios from 'axios';
import SmallPost from '../smallPost';
import './style.css'

const Profile = ({user, posts, setPosts}) => {
  const userPosts = posts.filter(p => p.author === user.name);

  const deleteHandler = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    const res = await axios.get('/api/posts');
    setPosts(res.data)
  };

  return (  
    <div className='profile-container'>
      <b className='profile__greeting'>Hello, {user.givenName}!</b>
      <div className='profile__info'>
      <img width='50px' height='50px' src={user.imageUrl} alt='Profile'/>
      <ul className='profile__text'>
        <li>👤 {user.name}</li>
        <li>✉️ {user.email}</li>
      </ul>
      </div>
      <ul>
        {userPosts?.map((p,i) => 
          <li key={i}>
          <SmallPost post={p} />
          <button className='delete__post' onClick={() => deleteHandler(p.id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Profile;