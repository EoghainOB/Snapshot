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
      <div>
        <p>Title: {post.title}</p>
        {post.description !== 'undefined' && <p>Description: {post.description}</p>}
        {post.tags[0] !== 'undefined' && <p>Tags: {post.tags}</p>}
        <p>Author: {post.author}</p>
        <p>Location: {post.address}</p>
        <p>Date: {newDate.toLocaleString('nl')}</p>
        <p>Views: {post.views}</p>
        <div>
          <p>Rank: {ranking}</p>
          {user && <button onClick={increaseHandler}>+</button>}
          {user && <button onClick={decreaseHandler}>-</button>}
        </div>
        {post.imageLink.map(x => {
            if(x.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                return <img width="100%" key={x} src={x} alt={post.title}/>
            }
            return (
                    <video key={x} width="100%" controls>
                        <source src={x}/>
                    </video>
                    )
                }
            )
        }
    </div>
  )
}

export default Post
