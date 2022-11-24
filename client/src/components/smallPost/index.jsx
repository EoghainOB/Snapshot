import React, {useState} from 'react'
import axios from 'axios';

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
        <li>
        <p>{title}</p>
        <p>Author: {author}</p>
        <p>Location: {address?.replace(/^([^,]*,*)/, '')}</p> 
        <p>Date: {newDate.toLocaleString('nl').match(/^[\d|-]*/)}</p>
        <p>Views: {views}</p>
        <div>
          <p>Rank: {ranking}</p>
          {user && <button onClick={increaseHandler}>+</button>}
          {user && <button onClick={decreaseHandler}>-</button>}
        </div>
        {imageLink.map(x => {
            const thumbnail = x.replace(/upload\//, 'upload/w_200,h_200,c_fill/');
            if(thumbnail.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                return <img width="200px" key={thumbnail} src={thumbnail} alt={title}/>
            }
            return (
                    <video key={thumbnail} width="200px" controls>
                        <source src={thumbnail}/>
                    </video>
                    )
                }
            )
        }
    </li>
  )
}

export default SmallPost