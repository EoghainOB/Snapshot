import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEye, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SmallPost = ({ user, post }) => {
  const { id, title, address, date, imageLink, views, upvotes, downvotes } = post;
  const [upvote, setUpvote] = useState(upvotes)
  const [downvote, setDownvote] = useState(downvotes)
  const [ranking, setRanking] = useState(upvotes?.length - downvotes?.length);
  const [updateUp, setUpdateUp] = useState(true)
  const [updateDown, setUpdateDown] = useState(true)

  const increaseHandler = (e) => {
    e.preventDefault();
    if(!upvote.includes(user.googleId) && !downvote.includes(user.googleId)) {
    setUpvote(prev => [...prev, user.googleId])
    setUpdateUp(!updateUp)
    } else if(upvote.includes(user.googleId)) {
    const index = upvote.indexOf(user.googleId)
    upvote.splice(index, 1)
    setUpvote(upvote)
    setUpdateUp(!updateUp)
    } else if(downvote.includes(user.googleId)){
      console.log("nothing")
    }
  };

  const decreaseHandler = (e) => {
    e.preventDefault();
    if(!downvote.includes(user.googleId) && !upvote.includes(user.googleId)) {
      setDownvote(prev => [...prev, user.googleId])
      setUpdateDown(!updateDown)
    } else if(downvote.includes(user.googleId)){
    const index = downvote.indexOf(user.googleId)
    downvote.splice(index, 1)
    setDownvote(downvote)
    setUpdateDown(!updateDown)
    } else if(upvote.includes(user.googleId)) {
      console.log("nothing")
    }
  };

  useEffect(() => {
    const fetchUpvotes = async() => {
      await axios.patch(`/api/posts/${id}`, {upvotes: upvote})
    }
    fetchUpvotes()
    setRanking(upvote?.length - downvote?.length)
  }, [updateUp])

  useEffect(() => {
    const fetchDownvotes = async() => {
      await axios.patch(`/api/posts/${id}`, {downvotes: downvote})
    }
    fetchDownvotes()
    setRanking(upvote?.length - downvote?.length)
  }, [updateDown])

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
              <FontAwesomeIcon className='font-awesome__icon' icon={faLocationDot} />
              {address?.replace(/^([^,]*,*)/, "")}
            </span>
          )}
          <span className="dashboard__post__date">
          <FontAwesomeIcon className='font-awesome__icon' icon={faCalendar} />  {newDate.toLocaleString("nl").match(/^[\d|-]*/)}
          </span>
          <span className="dashboard__post__views"><FontAwesomeIcon className='font-awesome__icon' icon={faEye} />  {views}</span>
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
