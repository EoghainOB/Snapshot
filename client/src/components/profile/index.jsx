import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SmallPost from "../smallPost";
import "./style.css";

const Profile = ({ user, posts, setPosts }) => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${id}`);
      setUserData(res.data);
    };
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    };
    fetchUser();
    if (!posts.length) {
      fetchPosts();
    }
  }, [id, posts.length, setPosts]);

  const isSameUser = user?.googleId === userData?.googleId;

  const userPosts = posts.filter((p) => p.author === userData.name);

  const deleteHandler = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  return (
    <div className="profile-container">
      {isSameUser ? (
        <b className="profile__greeting">Hello, {userData.givenName}!</b>
      ) : (
        ""
      )}
      <div className="profile__info">
        <img className="profile__image" src={userData.imageUrl} alt="Profile" />
        <ul className="profile__text">
          <li>👤 {userData.name}</li>
          {isSameUser ? <li>✉️ {userData.email}</li> : ""}
       </ul>
      {user && user.googleId !== userData.googleId && <Link className='profile__send-message' to={`/chats/${+user?.googleId+ + +userData?.googleId}`}>Chat</Link>}
      </div>
      <ul>
        {userPosts?.map((p, i) => (
          <li key={i}>
            {/* FIX ME user not equal userData*/}
            <SmallPost user={userData} post={p} /> 
            {isSameUser ? (
              <button
                className="delete__post"
                onClick={() => deleteHandler(p.id)}
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
