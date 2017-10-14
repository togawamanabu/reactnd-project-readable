import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import {
  addPostsAction,
  getCategoriesAction,
  getAllPostsAction,
  orderPostDate,
  orderPostVote,
 } from '../actions'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import PostList from './PostList'
import Header from './Header'
import PostDetails from './PostDetails'
import PostEditDialog from './PostEditDialog'

import '../App.css';

class App extends Component {
  state = {
      newPostModalOpen: false,
      editingPost: null,
  }

  openNewPostModal= () => {
    this.setState(() => ({
      newPostModalOpen: true,
    }))
  }
  closeNewPostModal = () => {
    this.setState(() => ({
      newPostModalOpen: false,
    }))
  }

  componentDidMount() {
    this.props.getCategoriesAction()
    //this.props.getAllPosts()
  }

  setOrderbyTimestamp = () => {
    this.props.orderPostDate()
  }

  setOrderbyScore = () => {
    this.props.orderPostVote()
  }

  newPost = () => {
    this.setState({editingPost: null})
    this.openNewPostModal()
  }

  editPost = (post) => {
    this.setState({editingPost: post})
    this.openNewPostModal()
  }

  render() {
    const { categories} = this.props

    return (
      <div className='container'>
        <Route exact path="/" render={() => (
          <div>
            <Header categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />

            <div className="posts">
              <PostList editPost={this.editPost} />
            </div>

            <div className="addpost">
              <FloatingActionButton onClick={() => this.newPost()} style={{margin:20}} >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        )} />

      <Route path="/:category/:post_id" render={() => (
        <div>
          <Header categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />

          <PostDetails />
        </div>
      )} />


      <Route exact path="/:category" render={({match}) => (
        <div>
          <Header match={match} categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />
          <p>Category : {match.params.category}</p>
          <PostList editPost={this.editPost} />
        </div>
      )} />

    <PostEditDialog
      open={this.state.newPostModalOpen}
      categories={categories}
      handleClose={this.closeNewPostModal}
      editingPost={this.state.editingPost}
      />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.categories,
    posts: state.post.posts.filter(p => !p.deleted),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategoriesAction: () => dispatch(getCategoriesAction()),
    getAllPostsAction: () => dispatch(getAllPostsAction()),
    addPosts: (data) => dispatch(addPostsAction(data)),
    orderPostDate: () => dispatch(orderPostDate()),
    orderPostVote: () => dispatch(orderPostVote()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
