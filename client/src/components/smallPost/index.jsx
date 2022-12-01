import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEye,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const SmallPost = ({ user, post }) => {
  const {
    id,
    title,
    address,
    date,
    imageLink,
    views,
    rank,
    upvotes,
    downvotes,
  } = post;
  const [upvote, setUpvote] = useState(upvotes);
  const [downvote, setDownvote] = useState(downvotes);
  const [ranking, setRanking] = useState(rank);
  const [updateUp, setUpdateUp] = useState(false);
  const [updateDown, setUpdateDown] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setRanking(res.data.rank);
      setTimeout(() => {
        if(user) {
        setUpdateUp(res.data.upvotes.includes(user.googleId))
        setUpdateDown(res.data.downvotes.includes(user.googleId))
        }
      }, 300)
    };
    getPost();
  }, [post])


  const increaseHandler = (e) => {
    e.preventDefault();
    if (!upvote.includes(user.googleId) && !downvote.includes(user.googleId)) {
      axios.patch(`/api/posts/${id}`, { upvotes: [...upvote, user.googleId] });
      setUpvote((prev) => [...prev, user.googleId]);
      axios.patch(`/api/posts/${id}`, { rank: ranking + 1 });
      setRanking((prev) => prev + 1);
      setUpdateUp(true);
    } else if (upvote.includes(user.googleId)) {
      const index = upvote.indexOf(user.googleId);
      upvote.splice(index, 1);
      axios.patch(`/api/posts/${id}`, { upvotes: upvote });
      setUpvote(upvote);
      axios.patch(`/api/posts/${id}`, { rank: ranking - 1 });
      setRanking((prev) => prev - 1);
      setUpdateUp(false);
    }
  };

  const decreaseHandler = (e) => {
    e.preventDefault();
    if (!downvote.includes(user.googleId) && !upvote.includes(user.googleId)) {
      axios.patch(`/api/posts/${id}`, {
        downvotes: [...downvote, user.googleId],
      });
      setDownvote((prev) => [...prev, user.googleId]);
      axios.patch(`/api/posts/${id}`, { rank: ranking - 1 });
      setRanking((prev) => prev - 1);
      setUpdateDown(true);
    } else if (downvote.includes(user.googleId)) {
      const index = downvote.indexOf(user.googleId);
      downvote.splice(index, 1);
      axios.patch(`/api/posts/${id}`, { downvotes: downvote });
      setDownvote(downvote);
      axios.patch(`/api/posts/${id}`, { rank: ranking + 1 });
      setRanking((prev) => prev + 1);
      setUpdateDown(false);
    }
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
              <FontAwesomeIcon
                className="font-awesome__icon"
                icon={faLocationDot}
              />
              {address?.replace(/^([^,]*,*)/, "")}
            </span>
          )}
          <span className="dashboard__post__date">
            <FontAwesomeIcon className="font-awesome__icon" icon={faCalendar} />{" "}
            {newDate.toLocaleString("nl").match(/^[\d|-]*/)}
          </span>
          <span className="dashboard__post__views">
            <FontAwesomeIcon className="font-awesome__icon" icon={faEye} />{" "}
            {views}
          </span>
        </div>
        <div className="small-post__button-container">
          <button
            className={
              updateUp
                ? "small-post__button__increase--clicked"
                : "small-post__button__increase"
            }
            onClick={increaseHandler}
            disabled={user ? false : true}
          >
            ▲
          </button>
          <b className="post__rank">{ranking}</b>
          <button
            className={
              updateDown
                ? "small-post__button__decrease--clicked"
                : "small-post__button__decrease"
            }
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
