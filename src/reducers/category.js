import {
  ADD_CATEGORIES,
} from '../actions/types'


export function category (state = {categories:[]}, action) {

  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categories:action.data.categories
      }

    default:
      return state
  }
}
