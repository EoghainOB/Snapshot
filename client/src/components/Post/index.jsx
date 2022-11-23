import React from 'react'

const Post = ({post}) => {
    const { title, description, tags, author, address, date, imageLink } = post;
    const newDate = new Date(date);

  return (
    <div>
        <p>Title: {title}</p>
        {description !== 'undefined' && <p>Description: {description}</p>}
        {tags[0] !== 'undefined' && <p>Tags: {tags}</p>}
        <p>Author: {author}</p>
        <p>Location: {address}</p>
        <p>Date: {newDate.toLocaleString('nl')}</p>
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
