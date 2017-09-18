import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createPostAction, editPostAction } from '../actions'

class AddPost extends Component {
  static propType =  {
    categories: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
    editpost: PropTypes.object,
  }

  post = (e) => {
    const {refs} = this

    e.preventDefault()

    if(this.props.editpost) {
    this.props.editPostAction(
      this.props.editpost.id,
      this.refs.title.value,
      refs.body.value,
    )
    } else {
      this.props.createPostAction(
        this.refs.title.value,
        refs.body.value,
        refs.author.value,
        this.props.categories[refs.category.selectedIndex].name,
      )
    }

    this.props.closeModal()
  }

  componentDidMount() {
    const {editpost} = this.props

    if(editpost) {
      const {refs} = this

      this.refs.title.value = editpost.title
      refs.body.value = editpost.body
      //refs.author.value =editpost.author
      //refs.category.selectedIndex = this.props.categories.findIndex(cat => cat.path === editpost.category)
    }
  }

  render() {
    const namecategory = <div><p>name:<input type="text" name="author" ref="author"/></p>
    <p>category:
    <select name="category" ref="category">
      { this.props.categories.map( (cat) => {
        return <option key={cat.path} value={cat.path}>{cat.name}</option>
      })}
    </select>
    </p></div>

    return (
      <div>
      <form onSubmit={this.post}>
        <p>title:<input type="text" name="title" ref="title"/></p>
        <p>content:<input type="textarea" name="body" ref="body"/></p>

        {this.props.editpost?'':namecategory}

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
    createPostAction: (title, body, author, category) => dispatch(createPostAction(title, body, author, category)),
    editPostAction: (post_id, title, body) => dispatch(editPostAction(post_id, title, body)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( AddPost ));
