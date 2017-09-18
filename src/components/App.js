import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { orderByScore, orderByTime } from '../utils/helpers'
import { addPostsAction, getCategoriesAction, getAllPosts } from '../actions'

import PostList from './PostList'
import Header from './Header'
import PostDetails from './PostDetails'
import AddPost from './AddPost'

import '../App.css';

class App extends Component {
  state = {
      newPostModalOpen: false,
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
    this.props.getAllPosts()


    orderByScore(this.props.posts)

  }

  setOrderbyTimestamp = () => {
      const orderedposts = orderByTime(this.props.posts)
      this.setState(() => ({posts: orderedposts}) )
  }

  setOrderbyScore = () => {
    const orderedposts = orderByScore(this.props.posts)
    this.setState(() => ({posts: orderedposts}) )
  }

  render() {
    const { categories, posts} = this.props

    return (
      <div className='container'>
        <Route exact path="/" render={() => (
          <div>
            <Header categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />

            <div className="posts">
              <PostList posts={posts} />
            </div>

            <div className="addpost">
              <button onClick={() => this.openNewPostModal()}>Add Post</button>
            </div>
          </div>
        )} />

      <Route path="/:category/:post_id" component={PostDetails} />

        <Route exact path="/:category" render={({match}) => (
          <div>
            <Header match={match} categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />
            <p>Category : {match.params.category}</p>
            <div className="posts">
              <PostList posts={posts} category={match.params.category} />
            </div>
          </div>
        )} />

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.newPostModalOpen}
          onRequestClose={this.closeNewPostModal}
          contentLabel='Modal'
        >
          <div>
            <AddPost categories={categories} closeModal={this.closeNewPostModal}/>
          </div>
        </Modal>
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
    getAllPosts: () => dispatch(getAllPosts()),
    addPosts: (data) => dispatch(addPostsAction(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
