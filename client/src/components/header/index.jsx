import React from 'react'
import Login from '../login'
import { Link } from "react-router-dom";
import './index.css'

const Header = ({setUser, user}) => {
  return (
    <header>
        <Link className='header__title' to='/'>SnapShot</Link>
        <nav className='header__nav'>
        <ul className='header__list'>
          <li className='header__item'>{user && <Link to={`/post`}>Upload</Link>}</li>
          <li className='header__item'><Link to={`/users/`}>Users</Link></li>
          <li className='header__item'>{user && <Link to={`/users/${user.googleId}`}>Profile</Link>}</li>
          <li className='header__item'><Login setUser={setUser} user={user}/></li>
        </ul>
        </nav>
    </header>
  )
}

export default Header
