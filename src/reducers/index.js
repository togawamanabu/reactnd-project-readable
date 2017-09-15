import { combineReducers } from 'redux'

import { ADD_CATEGORIES, } from '../actions'

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

export default category
