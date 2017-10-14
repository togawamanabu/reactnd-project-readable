import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getPostCommentAction, getCategoryPosts, getAllPostsAction} from '../actions'
import Post from './Post'
import PropTypes from 'prop-types'

class PostList extends Component {
  static propType =  {
    editPost: PropTypes.func.isRequired,
  }

  componentDidMount() {
    var category=this.props.match.params.category

    if(category) {
      this.props.getCategoryPosts(category)
    } else {
      this.props.getAllPostsAction()
    }
  }

  render() {
    let {posts} =  this.props

    return(
      <div className="postlist">
          {posts.map((post) => (
            <Post post={post} key={post.id} editPost={this.props.editPost}/>
         ))}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    posts: state.post.posts.filter(p => !p.deleted),
    category: state.category.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPostsAction: () => dispatch(getAllPostsAction()),
    getPostCommentAction: (post_id) => dispatch(getPostCommentAction(post_id)),
    getCategoryPosts: (category) => dispatch(getCategoryPosts(category)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( PostList ));
