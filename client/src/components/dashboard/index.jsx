import React from 'react'
import SmallPost from '../smallPost'

const Dashboard = ({user, sort, setSort, posts}) => {
    const sortHandler = (e) => {
    setSort(e.target.value)
    }

  return (
    <div>
    <select name="sort" onChange={sortHandler}>
        <option value="Top Rank">Top Rank</option>
        <option value="Lowest Rank">Lowest Rank</option>
        <option value="Most Viewed">Most Views</option>
        <option value="Lowest Views">Lowest Views</option>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
    </select>
    <h1>{sort}</h1>
    <ul>
    {posts.map(p => {
      return (
        <SmallPost user={user} key={p.id} post={p}/>
      )
    })}
    </ul>
    </div>
  )
}

export default Dashboard