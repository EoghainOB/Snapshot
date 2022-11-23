import React from 'react'
import Post from '../Post'

const TopPosts = ({posts}) => {
  return (
    <div>
    <h1>TOP POSTS</h1>
    {posts.map(p => {
      return (
        <Post key={p.id} post={p}/>
      )
    })}</div>
  )
}

export default TopPosts