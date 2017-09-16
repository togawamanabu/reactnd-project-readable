import { combineReducers } from 'redux'

import { ADD_CATEGORIES, ADD_POSTS } from '../actions'

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
  const { posts } = action

  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        posts: posts
      }

    default:
      return state

  }
}

export default combineReducers({
  category,
  post,
})
