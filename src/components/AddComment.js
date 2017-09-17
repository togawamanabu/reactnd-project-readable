import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'


class AddComment extends Component {
  static propType =  {
    comments: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
      <form>
        name:<input type="text" name="name" />
        comment:<input type="textarea" name="comment" />
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
      }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( AddComment ));
