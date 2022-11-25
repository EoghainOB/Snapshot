import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import './index.css';

const Post = ({user}) => {
    const [post, setPost] = useState(null)
    const [ranking, setRanking] = useState(null);
    const { postId } = useParams();
    
    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get(`/api/posts/${postId}`)
            setPost(res.data)
            setRanking(res.data.rank)
            await axios.patch(`/api/posts/${postId}`, {views: res.data.views + 1});
        };
        getPost();
    }, [postId])
    
    if (!post) {
        return null;
    }
    
    const increaseHandler = async(e, rank) => {
        e.preventDefault();
        let newRank = ranking + 1;
        setRanking(newRank)
        await axios.patch(`/api/posts/${post.id}`, {rank: newRank});
    }
    
    const decreaseHandler = (e) => {
        e.preventDefault();
        if (ranking) {
        let newRank = ranking - 1;
        setRanking(newRank)
        axios.patch(`/api/posts/${post.id}`, {rank: newRank});
        }
    }
    
    const newDate = new Date(post.date);

  return (
      <div className='post'>
        <h1 className='post__title'>{post.title}</h1>
        <p className='post__author'>Author: {post.author}</p>
        {post.imageLink.map(x => {
            const heicFix = x.replace(/heic/, 'jpeg');
            if(heicFix.match(/.*\.(gif|jpe?g|bmp|png|jpg)$/i)) {
                return <img className='post__image' width="100%" key={heicFix} src={heicFix} alt={post.title}/>
            }
            return (
                    <video className='post__video' key={heicFix} width="100%" controls>
                        <source src={heicFix}/>
                    </video>
                    )
                }
            )
        }
        {post.description !== 'undefined' && <p className='post__description'>{post.description}</p>}
        <div className='post__bottom'>
        <div className='post__left'>
        {post.tags[0] !== 'undefined' && <span className='post__tags'>🏷  {post.tags}</span>}
        <span className='post__location'>📍  {post.address}</span>
        <span className='post__date'>📅  &nbsp;{newDate.toLocaleString('nl')}</span>
        <span className='post__views'>👁  {post.views}</span>
        </div>
        <div className='post__button-container'>
          {user && <button className='post__button__increase' onClick={increaseHandler}>▲</button>}
          <b className='post__rank'>{ranking}</b>
          {user && <button className='post__button__decrease'onClick={decreaseHandler}>▼</button>}
        </div>
        </div>
    </div>
  )
}

export default Post
