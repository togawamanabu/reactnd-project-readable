import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'

class CommentList extends Component {
  static propType =  {
    comments: PropTypes.array.isRequired
  }

  render() {
    let comments = this.props.comments.map( (comment) => (
      <li key={comment.id}>
        <p>{comment.body} by {comment.author} - {formatTimestamp(comment.timestamp)} ({comment.voteScore})</p>
        <div><button>+1</button><button>-1</button></div>
        <div className="edit"><button>edit</button><button>delete</button></div>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( CommentList ));
