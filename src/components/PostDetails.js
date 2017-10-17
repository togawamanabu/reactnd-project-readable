import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import CommentList from './CommentList'
import AddComment from './AddComment'
import Post from './Post'

import {
  deletePostAction,
  votePostAction,
  getPostAction,
  getPostCommentAction,
 } from '../actions'

class PostDetails extends Component {
  static propType =  {
    category: PropTypes.string.isRequired,
  }

  state = {
      editPostModalOpen: false,
  }

  componentDidMount() {
    const { post_id } = this.props.match.params;

    this.props.getPostAction(post_id)
    this.props.getPostCommentAction(post_id)
  }

  openEditPostModal= () => {
    this.setState(() => ({
      editPostModalOpen: true,
    }))
  }
  closeEditPostModal = () => {
    this.setState(() => ({
      editPostModalOpen: false,
    }))
  }

  editPost = (e) => {
    e.preventDefault()

    this.openEditPostModal()
  }

  render() {
    const {post} = this.props

    const comments = this.props.comments[this.props.match.params.post_id]?this.props.comments[this.props.match.params.post_id]:[]

    if (!post)
      return <div>not found</div>

    return (

      <div>

        <Post post={post}  />

        <CommentList comments={comments} />

        <AddComment postId={this.props.match.params.post_id} />

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    categories: state.category.categories,
    post: state.post.posts.filter( (p) => p.id === props.match.params.post_id)[0],
    comments: state.comment.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostAction: (post_id) => dispatch(getPostAction(post_id)),
    votePostAction: (post_id, upordown) => dispatch(votePostAction(post_id, upordown)),
    deletePostAction: (post_id) => dispatch(deletePostAction(post_id)),
    getPostCommentAction: (post_id) => dispatch(getPostCommentAction(post_id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
