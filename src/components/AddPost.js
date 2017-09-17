import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import { createPostAction } from '../actions'
import { addNewPost } from '../utils/api'
import uuidv4 from 'uuid/v4';

class AddPost extends Component {
  static propType =  {
    categories: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired
  }

  post = (e) => {
    const {refs} = this

    e.preventDefault()

    let d = new Date()

    addNewPost(
      uuidv4(),
      this.refs.title.value,
      refs.body.value,
      refs.author.value,
      this.props.categories[refs.category.selectedIndex].name,
      d.getTime(),
     ).then( (newpost) => {
      this.props.addPost(newpost)
      this.props.history.push(`/posts/${newpost.id}`)
      this.props.closeModal()
    })
  }

  render() {
    console.log(this.props.categories)

    return (
      <div>
      <form onSubmit={this.post}>
        <p>name:<input type="text" name="author" ref="author"/></p>
        <p>title:<input type="text" name="title" ref="title"/></p>
        <p>content:<input type="textarea" name="body" ref="body"/></p>
        <p>category:
        <select name="category" ref="category">
          { this.props.categories.map( (cat) => {
            return <option key={cat.path} value={cat.path}>{cat.name}</option>
          })}
        </select>
        </p>
        <button type="submit">post</button>
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
    addPost: (newpost) => dispatch(createPostAction(newpost))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( AddPost ));
