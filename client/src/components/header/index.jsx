import React from 'react'
import Login from '../login'
import { Link } from "react-router-dom";
import './index.css'

const Header = ({messageAlert, setUser, user, update}) => {

  return (
    <header>
        <Link className='header__title' to='/'>SnapShot</Link>
        <li className='header__item'>{user && <Link to={`/users/${user.googleId}`}>Profile</Link>}</li>
        <nav className='header__nav'>
        <ul className='header__list'>
          <li className='header__item'>{user && <Link to={`/post`}>Upload</Link>}</li>
          <li className='header__item'><Link to={`/users/`}>Users</Link></li>
          {user && <Link className='header__item' to='/chats/'>Chat
          {messageAlert > 0 && <span className='header__unread'></span>}
          </Link>}
          <li className='header__item'><Login setUser={setUser} user={user}/></li>
        </ul>
        </nav>
    </header>
  )
}

export default Header
