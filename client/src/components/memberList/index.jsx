import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './index.css';

const MemberList = ({posts, user}) => {
  const [users, setUsers] = useState([])

  const getUserPosts = (user) => {
    const userPosts = posts.filter(p => p.author === user.name);
    return userPosts;
  }

  const getRanking = (user) => {
    const posts = getUserPosts(user);
    const rank = posts.map(post => post.rank);
    return (rank.reduce((prev, curr) =>  prev + curr, 0));
  }

  useEffect(() => {
    const getUsers = async() => {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    }
    getUsers();
  },[])
  
  return (
    <>
      <div className='member-list'><h2>Users</h2>
      <ul className='member-list__list'>
        {users.map((user, i) => 
        <>
        <ul key={i} className='member-list__list_item'>
          <li className='member-list__image'>
            <img src={user.imageUrl} alt=""/>
          </li>
          <li className='member-list__username'>{user.name}</li>
          <li className='member-list__posts'>Posts: {getUserPosts(user).length}</li>
          <li className='member-list__rank'>Rank: {getRanking(user)}</li>
        </ul>
        
        <hr/>
        </>
        )}
      </ul>
      </div>
    </>
  )
}

export default MemberList