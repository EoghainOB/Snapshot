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
    <>
      <Link to={`/posts/${post.id}`}>
        <p className="dashboard__post__title">{title}</p>
      </Link>
      <div className="dashboard__container">
        <div className="dashboard__post">
          <Link to={`/posts/${post.id}`}>
            <div className="dashboard__post__media-container">
              {imageLink.slice(0, 2).map((x) => {
                const thumbnail = x
                  .replace(/MP4|MOV|WMV|AVI|AVCHD|FLV|MKV|WEBM|MPEG-2/gi, "jpg")
                  .replace(/upload\//, "upload/w_400,h_400,c_fill/")
                  .replace(/heic/, "jpeg");
                return (
                  <img
                    style={{ borderRadius: "5px" }}
                    key={thumbnail}
                    src={thumbnail}
                    alt={title}
                  />
                );
              })}
            </div>
          </Link>
          {address && (
            <span className="dashboard__post__location">
              Location {address?.replace(/^([^,]*,*)/, "")}
            </span>
          )}
          <span className="dashboard__post__date">
            Date {newDate.toLocaleString("nl").match(/^[\d|-]*/)}
          </span>
          <span className="dashboard__post__views">Views {views}</span>
        </div>

        <div className="small-post__button-container">
          <button
            className="small-post__button__increase--clicked"
            onClick={increaseHandler}
            disabled={user ? false : true}
          >
            ▲
          </button>
          <b className="post__rank">{ranking}</b>
          <button
            className="small-post__button__decrease--clicked"
            onClick={decreaseHandler}
            disabled={user ? false : true}
          >
            ▼
          </button>
        </div>
      </div>
    </>
  );
};

export default SmallPost;
