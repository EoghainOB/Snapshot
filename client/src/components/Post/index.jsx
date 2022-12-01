import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEye,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "../comments";

const Post = ({ setSearchTerm, user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const [upvote, setUpvote] = useState([]);
  const [downvote, setDownvote] = useState([]);
  const [ranking, setRanking] = useState("");
  const [updateUp, setUpdateUp] = useState(false);
  const [updateDown, setUpdateDown] = useState(false);

  useEffect(() => {
    setSearchTerm('')
    if (user && post) {
      setUpvote(post.upvotes);
      setDownvote(post.downvotes);
      setUpdateUp(post.upvotes.includes(user.googleId));
      setUpdateDown(post.downvotes.includes(user.googleId));
    }
    if (post) {
      setRanking(post.rank);
    }
  }, [user, post]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/api/posts/${postId}`);
      setPost(res.data);
      await axios.patch(`/api/posts/${postId}`, { views: res.data.views + 1 });
    };
    getPost();
  }, [postId]);

  const increaseHandler = (e) => {
    e.preventDefault();
    if (!upvote.includes(user.googleId) && !downvote.includes(user.googleId)) {
      axios.patch(`/api/posts/${postId}`, {
        upvotes: [...upvote, user.googleId],
      });
      setUpvote((prev) => [...prev, user.googleId]);
      axios.patch(`/api/posts/${postId}`, { rank: ranking + 1 });
      setRanking((prev) => prev + 1);
      setUpdateUp(true);
    } else if (upvote.includes(user.googleId)) {
      const index = upvote.indexOf(user.googleId);
      upvote.splice(index, 1);
      axios.patch(`/api/posts/${postId}`, { upvotes: upvote });
      setUpvote(upvote);
      axios.patch(`/api/posts/${postId}`, { rank: ranking - 1 });
      setRanking((prev) => prev - 1);
      setUpdateUp(false);
    }
  };

  const decreaseHandler = (e) => {
    e.preventDefault();
    if (!downvote.includes(user.googleId) && !upvote.includes(user.googleId)) {
      axios.patch(`/api/posts/${postId}`, {
        downvotes: [...downvote, user.googleId],
      });
      setDownvote((prev) => [...prev, user.googleId]);
      axios.patch(`/api/posts/${postId}`, { rank: ranking - 1 });
      setRanking((prev) => prev - 1);
      setUpdateDown(true);
    } else if (downvote.includes(user.googleId)) {
      const index = downvote.indexOf(user.googleId);
      downvote.splice(index, 1);
      axios.patch(`/api/posts/${postId}`, { downvotes: downvote });
      setDownvote(downvote);
      axios.patch(`/api/posts/${postId}`, { rank: ranking + 1 });
      setRanking((prev) => prev + 1);
      setUpdateDown(false);
    }
  };

  if (!post) {
    return null;
  }

  const newDate = new Date(post.date);

  return (
    <div className="post">
      <h1 className="post__title">{post.title}</h1>
      <Link to={`/users/${post.googleId}`}>
        <p className="post__author">Author: {post.author}</p>
      </Link>
      {post.imageLink.map((x) => {
        const heicFix = x.replace(/heic/, "jpeg");
        if (heicFix.match(/.*\.(gif|jpe?g|bmp|png|jpg)$/i)) {
          return (
            <img
              className="post__image"
              width="100%"
              key={heicFix}
              src={heicFix}
              alt={post.title}
            />
          );
        }
        return (
          <video className="post__video" key={heicFix} width="100%" controls>
            <source src={heicFix} />
          </video>
        );
      })}
      {post.description !== "undefined" && (
        <p className="post__description">{post.description}</p>
      )}
      <div className="post__bottom">
        <div className="post__bottom-info">
          <p>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
            {post.address?.replace(/^([^,]*,*)/, "")}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> {newDate.toLocaleString("nl")}
          </p>
          <p>
            <FontAwesomeIcon icon={faEye} /> {post.views}
          </p>
        </div>
        <div className="post__button-container">
            <button
              className={
                updateUp
                  ? "post__button__increase--clicked"
                  : "post__button__increase"
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
                  ? "post__button__decrease--clicked"
                  : "post__button__decrease"
              }
              onClick={decreaseHandler}
              disabled={user ? false : true}
            >
              ▼
            </button>
        </div>
      </div>
      <Comments user={user} post={post} />
    </div>
  );
};

export default Post;
