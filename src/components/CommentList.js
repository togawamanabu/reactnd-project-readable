import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'

import {
  voteCommentAction,
  deleteCommentAction,

 } from '../actions'

class CommentList extends Component {
  static propType =  {
    comments: PropTypes.array.isRequired
  }

  vote = (e, upordown, comment_id) => {
    e.preventDefault()
    this.props.voteCommentAction(comment_id, upordown)
  }

  delete = (e, comment_id) => {
    e.preventDefault()
    this.props.deleteCommentAction(comment_id)
  }


  render() {
    let comments = this.props.comments.map( (comment) => (
      <li key={comment.id}>
        <p>{comment.body} by {comment.author} - {formatTimestamp(comment.timestamp)} ({comment.voteScore})</p>
        <div>
          <button onClick={(e) => this.vote(e, "upVote", comment.id) }>+1</button>
          <button onClick={(e) => this.vote(e, "downVote", comment.id)}>-1</button>
          </div>
        <div className="edit">
          <button>edit</button>
          <button onClick={(e) => this.delete(e, comment.id)}>delete</button>

          </div>
      </li>
    ))

    return (
      <ul>
        { comments }

      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteCommentAction: (comment_id, upordown) => dispatch(voteCommentAction(comment_id, upordown)),
    deleteCommentAction: (comment_id)  => dispatch(deleteCommentAction(comment_id)),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( CommentList ));
