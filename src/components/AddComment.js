import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createCommentAction } from '../actions'

class AddComment extends Component {
  static propType =  {
    postId: PropTypes.string.isRequired,
  }

  createcomment = (e) => {
    const {refs} = this

    e.preventDefault()

    this.props.createCommentAction(this.props.postId, refs.body.value, refs.author.value)

    refs.body.value = ""
    refs.author.value = ""
  }

  render() {
    return (
      <div>
      <form onSubmit={this.createcomment}>
        name:<input type="text" name="name" ref="author"/>
        comment:<input type="textarea" name="comment" ref="body" />
        <button type="submit">submit</button>
      </form>
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
      createCommentAction: (post_id, body, author) => dispatch(createCommentAction(post_id, body, author)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( AddComment ));
