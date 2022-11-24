import React, { useEffect, useState } from 'react'
import axios from 'axios';

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
      <div>MemberList</div>
      <ul>
        {users.map(user => 
        <>
          <li>
            <img key={user.name} src={user.imageUrl} alt=""/>
          </li>
          <li>{user.name}</li>
          <li>Posts: {getUserPosts(user).length}</li>
          <li>Rank: {getRanking(user)}</li>
        </>
        )}
      </ul>
    </>
  )
}

export default MemberList