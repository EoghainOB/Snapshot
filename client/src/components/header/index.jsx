import React from 'react'
import Login from '../login'
import { Link } from "react-router-dom";

const Header = ({setUser, user}) => {
  return (
    <header>
        <Link to='/'>SnapShot</Link>
        <nav>
            <Login setUser={setUser} user={user}/>
            {user && <Link to={`/users/${user.googleId}`}>User</Link>}
        </nav>
    </header>
  )
}

export default Header
