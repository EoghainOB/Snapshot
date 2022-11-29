import React, { useEffect, useState } from 'react'
import Login from '../login'
import { Link } from "react-router-dom";
import './index.css'
import axios from 'axios'

const Header = ({setUser, user, update}) => {
  const [messageAlert, setMessageAlert] = useState(null);

  useEffect(() => {
    const fetchNewMessages = async () => {
      const res = await axios.get(`/api/chats/${user.googleId}`);
      const filteredMessages = await res.data.map(chat => chat.messages.filter(mes => mes.authorId !== user.googleId && !mes.isRead))
      const eliminate = filteredMessages.filter(x => x.length > 0)
      setMessageAlert(eliminate.length);
    }
    console.log('fetching messages again')
    fetchNewMessages()
}, [user, update]);

  return (
    <header>
        <Link className='header__title' to='/'>SnapShot</Link>
        <li className='header__item'>{user && <Link to={`/users/${user.googleId}`}>Profile</Link>}</li>
        <nav className='header__nav'>
        <ul className='header__list'>
          <li className='header__item'>{user && <Link to={`/post`}>Upload</Link>}</li>
          <li className='header__item'><Link to={`/users/`}>Users</Link></li>
          {user && <Link className='header__item' to='/chats/'>Chat
          {messageAlert > 0 && <span className='header__unread'>{messageAlert}</span>}
          </Link>}
          <li className='header__item'><Login setUser={setUser} user={user}/></li>
        </ul>
        </nav>
    </header>
  )
}

export default Header
