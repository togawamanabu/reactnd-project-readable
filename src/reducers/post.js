import {
  ADD_POSTS,
  DELETE_POST,
  CREATE_POST,
  VOTE_POST,
  GET_POST,
  GET_ALL_POST,
  EDIT_POST,
  GET_CATEGORY_POST,
  ORDER_POSTS_DATE,
  ORDER_POSTS_VOTE,
} from '../actions/types'

export function post (state={posts:[]}, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        posts: [action.data]
      }
    case ADD_POSTS:
      return {
        ...state,
        posts: action.posts
      }

    case GET_ALL_POST:
      return {
        ...state,
        posts: action.posts
      }

    case GET_CATEGORY_POST:
      return {
        ...state,
        posts: action.posts
      }

    case ORDER_POSTS_DATE:
      return {
        ...state,
        posts: state.posts.sort( (a,b) => {
          return a.timestamp < b.timestamp
        })
      }

      case ORDER_POSTS_VOTE:
        return {
          ...state,
          posts: state.posts.sort( (a,b) => {
            return a.voteScore < b.voteScore
          })
        }

    case DELETE_POST:
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

    case EDIT_POST:
      const editedposts = state.posts.map((post, index) => {
        if(post.id === action.post.id) {
          return action.post
        } else {
          return post
        }
      })

    return {...state, posts: editedposts}

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
