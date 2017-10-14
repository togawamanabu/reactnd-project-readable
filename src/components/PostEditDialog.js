import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createPostAction, editPostAction } from '../actions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class PostEditDialog extends Component {
  static propType =  {
    categories: PropTypes.array.isRequired,
    editingPost: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  }

  state = {
    selected_category: 0,
    post_id: "",
    title: "",
    body: "",
    author: ""
  }

  post = (e) => {
    e.preventDefault()

    if(this.props.editingPost) {
    this.props.editPostAction(
      this.props.editingPost.id,
      this.state.title,
      this.state.body
    )
    } else {
      this.props.createPostAction(
        this.state.title,
        this.state.body,
        this.state.author,
        this.state.selected_category,
      )
    }

    this.props.handleClose()
  }

  componentWillReceiveProps(nextProps) {
    const {editingPost} = nextProps

    if(editingPost) {
      const {refs} = this

      this.setState({
        title: editingPost.title,
        body: editingPost.body,
        author: editingPost.author,
        category: editingPost.category,
      })

      //refs.author.value =editpost.author
      //refs.category.selectedIndex = this.props.categories.findIndex(cat => cat.path === editpost.category)
    }
  }

  handleCategoryChange = (event, index, selected_category) => this.setState({selected_category});
  handleTitleChange = (event) => {this.setState({title:event.target.value})}
  handleBodyChange = (event) => {this.setState({body:event.target.value})}
  handleAuthorChange = (event) => {this.setState({author:event.target.value})}

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.post}
      />,
    ];

    const namecategory = <div>
      <TextField hintText="Author" value={this.state.author} onChange={this.handleAuthorChange} /><br/>
      <SelectField
          floatingLabelText="Category" hintText="Category"
          value={this.state.selected_category}
          onChange={this.handleCategoryChange}
        >
        { this.props.categories.map( (cat) => {
          return <MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />
        })}
        </SelectField>
    </div>

    return (
      <div>
        <Dialog
          title="Create new Post"
          actions = {actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.closeNewPostModal}
        >
          <div>
          <form onSubmit={this.post}>
          <TextField hintText="Title" value={this.state.title} onChange={this.handleTitleChange} /><br/>
          <TextField name="body" ref="body"
            hintText="Content"
            multiLine={true}
            rows={3}
            rowsMax={30}
            value={this.state.body}
            onChange={this.handleBodyChange}
          /><br/>

        {this.props.editingPost?'':namecategory}

          </form>
          </div>
        </Dialog>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( PostEditDialog ));
