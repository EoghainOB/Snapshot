import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

const SmallPost = ({ user, post }) => {
  const { id, title, address, date, imageLink, views, rank } = post;
  const [ranking, setRanking] = useState(rank);

  const increaseHandler = (e) => {
    e.preventDefault();
    let newRank = ranking + 1;
    setRanking(newRank);
    axios.patch(`/api/posts/${id}`, { rank: newRank });
  };

  const decreaseHandler = (e) => {
    e.preventDefault();
    let newRank = ranking - 1;
    setRanking(newRank);
    axios.patch(`/api/posts/${id}`, { rank: newRank });
  };

  const newDate = new Date(date);

  return (
    <div className="dashboard__container">
    <div className="dashboard__left">
    <li className="dashboard__post">
      <Link to={`/posts/${post.id}`}>
        <p className="dashboard__post__title">{title}</p>
      </Link>
      <span className="dashboard__post__location">
        Location: {address?.replace(/^([^,]*,*)/, "")}
      </span>
      <span className="dashboard__post__date">
        Date: {newDate.toLocaleString("nl").match(/^[\d|-]*/)}
      </span>
      <Link to={`/posts/${post.id}`}>
        <div className="dashboard__post__media-container">
          {imageLink.map((x) => {
            const thumbnail = x.replace(
              /upload\//,
              "upload/w_200,h_200,c_fill/"
            );
            if (thumbnail.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
              return <img key={thumbnail} src={thumbnail} alt={title} />;
            }
            return (
              <video key={x} controls>
                <source src={x} />
              </video>
            );
          })}
        </div>
      </Link>
    </li>
    </div>
    <div className="dashboard__right">
    <span className="dashboard__post__views">Views: {views}</span>
      <div className="dashboard__post__button-container">
        {user && <button className="upvote-btn" onClick={increaseHandler}>+</button>}
        <span className="dashboard__post__rank">Rank: {ranking}</span>
        {user && <button className="downvote-btn" onClick={decreaseHandler}>-</button>}
      </div>
    </div>
    </div>
  );
};

export default SmallPost;
