import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './index.css';
import { Link } from "react-router-dom";

const MemberList = ({posts}) => {
  const [users, setUsers] = useState([])
  const [userSearch, setUserSearch] = useState(null)

  const getUserPosts = (user) => {
    const userPosts = posts.filter(p => p.author === user.name);
    return userPosts;
  }

  const getRanking = (user) => {
    const posts = getUserPosts(user);
    const rank = posts.map(post => post.rank);
    return (rank.reduce((prev, curr) =>  prev + curr, 0));
  }

  const searchUserHandler = (e) => {
    setUserSearch(e.target.value)
  }

  const filtered = userSearch ? users.filter(p => p.name?.toLowerCase().includes(userSearch.toLowerCase())): users ;
  
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
      <div className='searchBar-container'>
      <input className='searchBar' onChange={searchUserHandler} type='text' placeholder='Search for user...' />
      </div>
      <ul className='member-list__list'>
        {filtered.map((user, i) => 
        <li className='member-list__list__item-container' key={user.googleId}>
        <ul key={i} className='member-list__list_item'>
        <Link to={`/users/${user.googleId}`}>
          <li className='member-list__image'>
            <img src={user.imageUrl} alt=""/>
          </li>
        </Link>
        <Link to={`/users/${user.googleId}`}>
          <li className='member-list__username'>{user.name}</li>
        </Link>
        <li className='member-list__posts'>Posts: {getUserPosts(user).length}</li>
        <li className=' '>Rank: {getRanking(user)}</li>
        </ul>
        
        <hr/>
        </li>
        )}
      </ul>
      </div>
    </>
  )
}

export default MemberList