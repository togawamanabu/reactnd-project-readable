import { combineReducers } from 'redux'

import {
  ADD_CATEGORIES,
  ADD_POSTS,
  DELETE_POST,
  CREATE_POST,
  VOTE_POST,
  GET_POST,
  CREATE_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  } from '../actions'

function category (state = {categories:[]}, action) {
  const { categories } = action

  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categories:categories
      }

    default:
      return state
  }
}

function post (state={posts:[]}, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        [action.post_id]: {...action.data}
      }
    case ADD_POSTS:
      return {
        ...state,
        posts: action.posts
      }

    case DELETE_POST:
      console.log("deleted")
      const deletedposts = state.posts.map((post, index) => {
        if(post.id === action.post.id) {
          return action.post
        } else {
          return post
        }
      })

      return {...state, posts: deletedposts}

    case CREATE_POST:
      return {
        ...state,
        posts: state.posts.concat(action.newpost)
      }

    case VOTE_POST:
      const voteupdatedpost = state.posts.map((post, index) => {
        if(post.id === action.post.id) {
          return action.post
        } else {
          return post
        }
      })

      // {...state,
      //   posts: [
      //     ...state.posts,
      //     ...action.post
      //   ]
      // }

      return {...state, posts: voteupdatedpost}

    default:
      return state

  }
}

function comment (state={comment:[]}, action) {
  const { comment } = action
}

export default combineReducers({
  category,
  post,
})
