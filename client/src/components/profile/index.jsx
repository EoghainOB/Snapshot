import React from 'react'
import axios from 'axios';

const Profile = ({user, posts, setPosts}) => {
  console.log('user:',user.imgUrl)
  const userPosts = posts.filter(p => p.author === user.name);

  const deleteHandler = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    const res = await axios.get('/api/posts');
    setPosts(res.data)
  };

  return (  
    <div className='profile-container'>
    <img width='50px' src={user.imageUrl} alt='Profile'/>
    <p>Hello, {user.givenName}!</p>
    <ul>
      <li>Name: {user.name}</li>
      <li>Email: {user.email}</li>
    </ul>
    <ul>
      {userPosts?.map(p => 
        <li key={p.id}>
        <div>
        <p>{p.title}</p>
        {p.description !== 'undefined' && <p>Description: {p.description}</p>}
        {p.tags[0] !== 'undefined' && <p>Tags: {p.tags}</p>}
        <p>Location: {p.address}</p>
        <p>Date: {new Date(p.date).toLocaleString('nl')}</p>
        <p>Views: {p.views}</p>
        <div>
        <p>Rank: {p.rank}</p>
        </div>
        {p.imageLink.map(x => {
            if(x.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                return <img width="100%" key={x} src={x} alt={p.title}/>
            }
            return (
                    <video key={x} width="100%" controls>
                        <source src={x}/>
                    </video>
                    )
                }
            )
        }
    <button onClick={() => deleteHandler(p.id)}>Delete</button>
    </div>
        </li>)}
    </ul>

    </div>
  )
}

export default Profile;