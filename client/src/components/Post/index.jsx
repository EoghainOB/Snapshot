import React, {useState} from 'react'
import axios from 'axios';
import './index.css';

const Post = ({post}) => {
    const { id, title, description, tags, author, address, date, imageLink, views, rank } = post;
    const [ranking, setRanking] = useState(rank);

    const increaseHandler = (e) => {
        e.preventDefault();
        let newRank = ranking + 1;
        setRanking(newRank)
        axios.patch(`/api/posts/${id}`, {rank: newRank});
    }

    const decreaseHandler = (e) => {
        e.preventDefault();
        let newRank = ranking - 1;
        setRanking(newRank)
        axios.patch(`/api/posts/${id}`, {rank: newRank});
    }
    
    const newDate = new Date(date);

  return (
    <div>
        <p>Title: {title}</p>
        {description !== 'undefined' && <p>Description: {description}</p>}
        {tags[0] !== 'undefined' && <p>Tags: {tags}</p>}
        <p>Author: {author}</p>
        <p>Location: {address}</p>
        <p>Date: {newDate.toLocaleString('nl')}</p>
        <p>Views: {views}</p>
        <div>
          <p>Rank: {ranking}</p>
          <button onClick={increaseHandler}>+</button>
          <button onClick={decreaseHandler}>-</button>
        </div>
        {imageLink.map(x => {
            if(x.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                return <img width="100%" key={x} src={x} alt={title}/>
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
