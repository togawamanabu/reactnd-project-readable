import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import Modal from 'react-modal'
import AddComment from './AddComment'

import {
  voteCommentAction,
  deleteCommentAction,

 } from '../actions'

class CommentList extends Component {
  static propType =  {
    comments: PropTypes.array.isRequired
  }

  state = {
      editCommentModalOpen: false,
      editComment: null,
  }

  vote = (e, upordown, comment_id) => {
    e.preventDefault()
    this.props.voteCommentAction(comment_id, upordown)
  }

  delete = (e, comment_id) => {
    e.preventDefault()
    this.props.deleteCommentAction(comment_id)
  }

  editComment = (e, comment) => {
    e.preventDefault()

    this.setState({editcomment: comment})

    this.openEditCommentModal()
  }


  openEditCommentModal= () => {
    this.setState(() => ({
      editCommentModalOpen: true,
    }))
  }

  closeEditCommentModal = () => {
    this.setState(() => ({
      editCommentModalOpen: false,
    }))
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
          <button onClick={(e) => this.editComment(e, comment)}>edit</button>
          <button onClick={(e) => this.delete(e, comment.id)}>delete</button>

          </div>
      </li>
    ))

    return (
      <div>
        <ul>
          { comments }

        </ul>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.editCommentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
          <div>
            <AddComment
              postId={this.props.match.params.post_id}
              editcomment={this.state.editcomment}
              closeModal={this.closeEditCommentModal} />
          </div>
        </Modal>
      </div>
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
