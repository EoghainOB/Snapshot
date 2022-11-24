import React from 'react'
import Post from '../Post'
import "./index.css";

const Dashboard = ({setSort, posts}) => {
    const sortHandler = (e) => {
    setSort(e.target.value)
    }
  return ( 
    <div>
    <div className='dashboard__select'>
    <select name="sort" onChange={sortHandler}>
        <option value="topRank">Top Rank</option>
        <option value="lowestRank">Lowest Rank</option>
        <option value="topViews">Top Views</option>
        <option value="lowestViews">Lowest Views</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
    </select>
    </div>
    <h1>TOP POSTS</h1>
    {posts.map(p => {
      return (
        <Post key={p.id} post={p}/>
      )
    })}
    </div>
  )
}

export default Dashboard