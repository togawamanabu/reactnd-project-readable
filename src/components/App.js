import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { orderByScore, orderByTime } from '../utils/helpers'
import { addPostsAction, getCategoriesAction, getAllPostsAction } from '../actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

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
    //this.props.getAllPosts()

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
              <PostList />
            </div>

            <div className="addpost">
              <FloatingActionButton onClick={() => this.openNewPostModal()} style={{margin:20}} >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        )} />

      <Route path="/:category/:post_id" component={PostDetails} />

      <Route exact path="/:category" render={({match}) => (
        <div>
          <Header match={match} categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />
          <p>Category : {match.params.category}</p>
          <PostList />
        </div>
      )} />

        <Dialog
          title="Create new Post"
          modal={false}
          open={this.state.newPostModalOpen}
          onRequestClose={this.closeNewPostModal}
        >
          <div>
            <AddPost categories={categories} closeModal={this.closeNewPostModal}/>
          </div>
        </Dialog>
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
