import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'

import { getCategories, getAllPosts } from '../utils/api'
import { orderByScore, orderByTime } from '../utils/helpers'
import { addCategories, addPosts } from '../actions'

import PostList from './PostList'
import Header from './Header'
import PostDetails from './PostDetails'

import '../App.css';

class App extends Component {
  componentDidMount() {
    const { addCategories, addPosts } = this.props

    getCategories().then((categories) => {
      addCategories(categories)
    })

    getAllPosts().then((posts) => {
      orderByScore(posts)
      addPosts(posts)
    })
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
      <div className="App">
        <Route exact path="/" render={() => (
          <div>
            <Header categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />

            <div className="posts">
              <PostList posts={posts} />
            </div>

            <div className="addpost">
              <Link to="addpost">Add Post</Link>
            </div>
          </div>
        )} />

        <Route exact path="/:category/:post_id" render={({match}) => (
          <div>
            <Header categories={categories} showButton={false} />

            <PostDetails category={match.params.category} post_id={match.params.post_id} />
          </div>
        )} />

        <Route exact path="/:category" render={({match}) => (
          <div>
            <p>Category : {match.params.category}</p>
            <Header match={match} categories={categories} setOrderbyScore={this.setOrderbyScore} setOrderbyTimestamp={this.setOrderbyTimestamp} />

            <div className="posts">
              <PostList posts={posts} category={match.params.category} />
            </div>
          </div>
        )} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.categories,
    posts: state.post.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: (data) => dispatch(addCategories(data)),
    addPosts: (data) => dispatch(addPosts(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
