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
        <div className="dashboard__post">
          <Link to={`/posts/${post.id}`}>
            <p className="dashboard__post__title">{title}</p>
          </Link>
          {address && (
            <span className="dashboard__post__location">
              📍 {address?.replace(/^([^,]*,*)/, "")}
            </span>
          )}
          <span className="dashboard__post__date">
            📅 {newDate.toLocaleString("nl").match(/^[\d|-]*/)}
          </span>
          <Link to={`/posts/${post.id}`}>
            <div className="dashboard__post__media-container">
              {imageLink.map((x) => {
                const thumbnail = x.replace(
                  /upload\//,
                  "upload/w_200,h_200,c_fill/"
                );
                if (thumbnail.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                  return (
                    <img
                      style={{ borderRadius: "5px" }}
                      key={thumbnail}
                      src={thumbnail}
                      alt={title}
                    />
                  );
                }
                return (
                  <video style={{ borderRadius: "5px" }} key={x} controls>
                    <source src={x} />
                  </video>
                );
              })}
            </div>
          </Link>
          <span className="dashboard__post__views">👁 {views}</span>
        </div>
      </div>
      <div className="dashboard__right">
        <div className="post__button-container">
          <button
            className="post__button__increase"
            onClick={increaseHandler}
            disabled={user ? false : true}
          >
            ▲
          </button>
          <b className="post__rank">{ranking}</b>
          <button
            className="post__button__decrease"
            onClick={decreaseHandler}
            disabled={user ? false : true}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallPost;
