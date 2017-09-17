import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import CommentList from './CommentList'
import AddComment from './AddComment'
import { deletePostAction, votePostAction, getPostAction } from '../actions'

class PostDetails extends Component {
  static propType =  {
    category: PropTypes.string.isRequired,
  }

  state = {
    comments:[],
  }

  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.getPostAction(post_id);

  }

  delete = (e) => {
    e.preventDefault()

    const { post_id } = this.props.match.params;
    this.props.deletePostAction(post_id)
    this.props.history.push('/')
  }

  vote = (e, upordown) => {
    e.preventDefault()
    const { post_id } = this.props.match.params;
    this.props.votePostAction(post_id, upordown)
  }


  render() {
    const {post, categories} = this.props

    if (!post)
      return <div>not found</div>

    return (
      <div>
        <div className='header'>
          <h2>Readable</h2>
          <div className="categoreis" >
          <ul className="nav">
            <li><Link to="/">Home</Link></li>
            {categories.map((cat) =>  <li key={cat.path}><Link to={cat.path}>{cat.name}</Link></li>)}
          </ul>
          </div>
        </div>


        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>{formatTimestamp(post.timestamp)}</p>
        <p>by. {post.author}</p>
        <p>{post.voteScore}</p>

        <div className="vote">
          <button onClick={(e) => this.vote(e, "upVote") }>+1</button>
          <button onClick={(e) => this.vote(e, "downVote")}>-1</button>
        </div>

        <div className="edit">
          <button>edit</button>
          <button onClick={(e) => this.delete(e)}>delete</button>
        </div>

        comments: { this.state.comments.length }

        <CommentList comments={this.state.comments} />

        <AddComment />

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    categories: state.category.categories,
    posts: state.post.posts,
    post: state.post.posts.filter( (p) => p.id === props.match.params.post_id)[0],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostAction: (post_id) => getPostAction(post_id),
    votePostAction: (post_id, upordown) => dispatch(votePostAction(post_id, upordown)),
    deletePostAction: (post_id) => dispatch(deletePostAction(post_id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
