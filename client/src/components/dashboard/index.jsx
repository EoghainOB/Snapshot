import React from 'react'
import SmallPost from '../smallPost'
import './index.css'

const Dashboard = ({user, sort, setSort, posts}) => {
    const sortHandler = (e) => {
    setSort(e.target.value)
    }

  return (
    <div className='dashboard'>
    <div className='dashboard__select'>
    <select name="sort" onChange={sortHandler}>
        <option value="Top Rank">Top Rank</option>
        <option value="Lowest Rank">Lowest Rank</option>
        <option value="Most Viewed">Most Views</option>
        <option value="Lowest Views">Lowest Views</option>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
    </select>
    </div>
    <h2 className='dashboard__title'>{sort}</h2>
    <ul className='dashboard__list'>
    {posts.map((p, i) => {
      return (
        <div key={i}>
        <SmallPost user={user} key={p.id} post={p}/>
        <hr />
        </div>
      )
    })}
    </ul>
    </div>
  )
}

export default Dashboard