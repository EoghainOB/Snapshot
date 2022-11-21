import React from 'react'
import Login from '../login'

const Header = ({login, loginHandler}) => {
  return (
    <header>
        <span>SnapShot</span>
        <nav>
            <Login login={login} loginHandler={loginHandler}/>
        </nav>
    </header>
  )
}

export default Header
