import React, {useState} from 'react'
import axios from 'axios';
import './index.css';

const SmallPost = ({user, post}) => {
    const { id, title, author, address, date, imageLink, views, rank } = post;
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
        <li className='dashboard__post'>
        <p className='dashboard__post__title'>{title}</p>
        <span className='dashboard__post__author'>Author: {author}</span>
        <span className='dashboard__post__location'>Location: {address?.replace(/^([^,]*,*)/, '')}</span> 
        <span className='dashboard__post__date'>Date: {newDate.toLocaleString('nl').match(/^[\d|-]*/)}</span>
        <span className='dashboard__post__views'>Views: {views}</span>
        <div className='dashboard__post__button-container'>
          <span className='dashboard__post__rank'>Rank: {ranking}</span>
          {user && <button onClick={increaseHandler}>+</button>}
          {user && <button onClick={decreaseHandler}>-</button>}
        </div>
        <div className='dashboard__post__media-container'>
        {imageLink.map(x => {
            const thumbnail = x.replace(/upload\//, 'upload/w_200,h_200,c_fill/');
            if(thumbnail.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                return <img key={thumbnail} src={thumbnail} alt={title}/>
            }
            return (
                    <video key={x} controls>
                        <source src={x}/>
                    </video>
                    )
                }
            )
        }
        </div>
    </li>
  )
}

export default SmallPost