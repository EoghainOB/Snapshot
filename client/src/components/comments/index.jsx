import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './index.css'
import moment from 'moment'

const Comments = ({ user, post }) => {
  const [comment, setComment] = useState(null);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    setCommentList(post.comments);
  }, []);

  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      googleId: user.googleId,
      name: user.name,
      imageUrl: user.imageUrl,
      message: comment,
      date: new Date()
    };
    axios.patch(`/api/posts/${post.id}`, { comments: [...commentList, newComment]} )
    setCommentList((prev) => [...prev, newComment]);
    e.target[0].value = ''
  };

  // useEffect(() => {
  //   const patchComment = async () => {
  //     if (commentList.length) {
  //       await axios.patch(`/api/posts/${post.id}`, { comments: commentList} );
  //     }
  //   };
  //   patchComment();
  // }, [commentList]);

  return (
    <>
      <h2 className="comments__title">Comments</h2>
      {commentList.length > 0 && <ul className="comments-container">
        {commentList.map((comment, i) => {
          return (
            <li className="comments__comment" key={i}>
              <div className="comment__upper">
            <Link to={`/users/${comment.googleId}`}>
              <img className='comment__image' alt={i} src={comment?.imageUrl} />
              </Link>
              <div>
              <Link to={`/users/${comment.googleId}`}>
                <span className="comment__author">{comment?.name}</span>
                </Link>
                <span className="comment__content">{comment?.message}</span>
                </div>
              </div>
                <span className="comment__date">{moment(comment?.date).fromNow()}</span>
            </li>
          );
        })}
      </ul>
      }
      {user && (
        <form className='comment__footer' onSubmit={handleSubmit}>
          <input className='comment__footer__input' type="text" placeholder="Enter Comment" onChange={commentInputHandler} />
          <button className='comment__footer__button' type="submit">Send</button>
        </form>
      )}
    </>
  );
};

export default Comments;
