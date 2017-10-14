import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createCommentAction, editCommentAction } from '../actions'
import {Card, CardText, CardTitle} from 'material-ui/Card'

class AddComment extends Component {
  static propType =  {
    postId: PropTypes.string.isRequired,
    closeModal: PropTypes.func,
    editcomment: PropTypes.object,
  }

  componentDidMount() {
    const {refs} = this
    const {editcomment} = this.props

    if(editcomment) {
      refs.body.value = editcomment.body
    }
  }

  createcomment = (e) => {
    const {refs} = this

    e.preventDefault()

    if(this.props.editcomment) {
      this.props.editCommentAction(this.props.editcomment.id, refs.body.value)
      this.props.closeModal()

    } else {
      this.props.createCommentAction(this.props.postId, refs.body.value, refs.author.value)
      refs.author.value = ""
    }

    refs.body.value = ""
  }

  render() {
    const nametag = <p>name:<input type="text" name="name" ref="author"/></p>
    const editcomment = this.props.editcomment?"Edit Comment":"Add Comment"
    return (
      <Card>
        <CardTitle title={editcomment}></CardTitle>
        <CardText>
          <form onSubmit={this.createcomment}>
          {this.props.editcomment?'':nametag}
          <p>comment:<input type="textarea" name="comment" ref="body" /></p>
            <button type="submit">submit</button>
          </form>
        </CardText>
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
      createCommentAction: (post_id, body, author) => dispatch(createCommentAction(post_id, body, author)),
      editCommentAction: (comment_id, body) => dispatch(editCommentAction(comment_id, body)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( AddComment ));
