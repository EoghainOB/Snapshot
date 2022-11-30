import React from "react";
import Login from "../login";
import { Link } from "react-router-dom";
import "./index.css";

const Header = ({ messageAlert, setUser, user }) => {
  return (
    <header>
      <Link className="header__title" to="/">
        SnapShot
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          {user && (
            <li className="header__item">
              <Link to={`/post`}>Upload</Link>
            </li>
          )}
          <li className="header__item">
            <Link to={`/users/`}>Users</Link>
          </li>
          {user && (
            <Link className="header__item" to="/chats/">
              Chat
              {messageAlert > 0 && <span className="header__unread"></span>}
            </Link>
          )}
          {user && (
            <li className="header__item">
              <Link to={`/users/${user.googleId}`}>
                Profile
              </Link>
            </li>
          )}
          <li className="header__item">
            <Login setUser={setUser} user={user} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
