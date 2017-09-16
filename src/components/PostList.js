import React from 'react'
import { formatTimestamp } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function PostList ({posts, category=null}) {
  if (posts.length === 0) {
    return <p>no post yet</p>
  }

  if (category) {
    posts = posts.filter((post) =>
      post.category === category
    )
  }



  return(
    <div className="postlist">
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>

            <h2><Link to={ post.category + "/" + post.id }>{post.title}</Link></h2>
            <p>{post.body}</p>
            <p>{formatTimestamp(post.timestamp)}</p>
            <p>{post.voteScore}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
