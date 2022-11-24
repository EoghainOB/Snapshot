import React, { useEffect, useState } from 'react'
import axios from 'axios';

const MemberList = ({posts, user}) => {
  const [users, setUsers] = useState([])

  const getUserPosts = (user) => {
    const userPosts = posts.filter(p => p.author === user.name);
    return userPosts;
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
      <div>MemberList</div>
      <ul>
        {users.map(user => 
        <>
          <li>
            <img src={user.imageUrl} alt=""/>
          </li>
          <li>{user.name}</li>
          <li>{getUserPosts(user).length}</li>
        </>
        )}
      </ul>
    </>
  )
}

export default MemberList