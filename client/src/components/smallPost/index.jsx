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
  const [updateUp, setUpdateUp] = useState(false)
  const [update, setUpdate] = useState(true)
  const [updateDown, setUpdateDown] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setUpdateUp(upvote.includes(user?.googleId))
      setUpdateDown(downvote.includes(user?.googleId))
    }, 500)
  }, [user])

  const increaseHandler = (e) => {
    e.preventDefault();
    if(!upvote.includes(user.googleId) && !downvote.includes(user.googleId)) {
    setUpvote(prev => [...prev, user.googleId])
    setUpdateUp(true)
    setUpdate(!update)
    } else if(upvote.includes(user.googleId)) {
    const index = upvote.indexOf(user.googleId)
    upvote.splice(index, 1)
    setUpvote(upvote)
    setUpdateUp(false)
    setUpdate(!update)
    }
  };

  const decreaseHandler = (e) => {
    e.preventDefault();
    if(!downvote.includes(user.googleId) && !upvote.includes(user.googleId)) {
      setDownvote(prev => [...prev, user.googleId])
      setUpdateDown(true)
      setUpdate(!update)
    } else if(downvote.includes(user.googleId)){
    const index = downvote.indexOf(user.googleId)
    downvote.splice(index, 1)
    setDownvote(downvote)
    setUpdateDown(false)
    setUpdate(!update)
    }
  };

  useEffect(() => {
    const fetchUpvotes = async() => {
      await axios.patch(`/api/posts/${id}`, {upvotes: upvote})
      console.log('updated up')
    }
    fetchUpvotes()
    setRanking(upvote?.length - downvote?.length)
  }, [updateUp, update])

  useEffect(() => {
    const fetchDownvotes = async() => {
      await axios.patch(`/api/posts/${id}`, {downvotes: downvote})
      console.log('updated down')
    }
    fetchDownvotes()
    setRanking(upvote?.length - downvote?.length)
  }, [updateDown, update])

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
            className={updateUp ? "small-post__button__increase--clicked" : "small-post__button__increase"}
            onClick={increaseHandler}
            disabled={user ? false : true}
          >
            ▲
          </button>
          <b className="post__rank">{ranking}</b>
          <button
            className={updateDown ? "small-post__button__decrease--clicked" : "small-post__button__decrease"}
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
