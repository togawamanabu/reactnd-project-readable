import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import Modal from 'react-modal'
import AddComment from './AddComment'
import Chip from 'material-ui/Chip'
import {Card, CardText, CardTitle} from 'material-ui/Card'
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'

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
    var styles = {
      card: {
        margin: 20,
      },
      date: {
        color: '#555',
        fontSize: 7,
        marginTop: 5

      }
    }

    let comments = this.props.comments.map( (comment) => (
      <div key={comment.id}>
        <p>{comment.body} <span style={styles.data}> by.{comment.author}</span></p>
        <Badge badgeContent={comment.voteScore} primary={true} />
        <div style={styles.date}>{formatTimestamp(comment.timestamp)}</div>
        <div>
          <IconButton onClick={(e) => this.vote(e, "upVote", comment.id) }>
            <FontIcon className="material-icons">thumb_up</FontIcon>
          </IconButton>
          <IconButton onClick={(e) => this.vote(e, "downVote", comment.id) }>
            <FontIcon className="material-icons">thumb_down</FontIcon>
          </IconButton>
          </div>
        <div className="edit">
          <RaisedButton label="Edit" onClick={(e) => this.editComment(e, comment)} primary={true}  />
          <RaisedButton label="Delete" onClick={(e) => this.delete(e, comment.id) }  secondary={true} />
        </div>
        <Divider />
      </div>
    ))

    return (
      <Card style={styles.card}  zDepth={3}>
          <CardTitle title="comments">
            <Chip>{ this.props.comments.length }</Chip>
          </CardTitle>

          <CardText>
            { comments }
          </CardText>

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
      </Card>
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
