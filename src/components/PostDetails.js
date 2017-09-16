import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import { getComments } from '../utils/api'

class PostDetails extends Component {
  static propType =  {
    category: PropTypes.string.isRequired,
    post_id: PropTypes.string.isRequired
  }

  state = {
    comments:[],
  }

  componentDidMount() {
    if (this.props.post_id) {
      getComments(this.props.post_id).then((comments) => {
        console.log("comments", comments)
        this.setState(() => ({comments: comments}) )
      })
    }
  }

  render() {
    let post = this.props.posts.filter((post) => post.id === this.props.post_id)[0]


    if (!post)
      return <div>not found</div>

    return (
      <div>

        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>{formatTimestamp(post.timestamp)}</p>
        <p>{post.author}</p>
        <p>{post.voteScore}</p>

        <div className="edit">
          <button>edit</button>
          <button>delete</button>
        </div>

        comments: { this.state.comments.length }

        

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.categories,
    posts: state.post.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
