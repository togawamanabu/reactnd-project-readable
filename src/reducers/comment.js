import {
  CREATE_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  EDIT_COMMENT,
} from '../actions/types'


export function comment (state={comments:[]}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }



    case VOTE_COMMENT:
      const voteupdatedcomments = state.comments.map((comment, index) => {
        if(comment.id === action.comment.id) {
          return action.comment
        } else {
          return comment
        }
      })

      return {...state, comments: voteupdatedcomments}

    case DELETE_COMMENT:
      const deletedcomments = state.comments.map((c, index) => {
        if(c.id === action.comment.id) {
          return action.comment
        } else {
          return c
        }
      })

      return {...state, comments: deletedcomments}

    case CREATE_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment)
      }

    case EDIT_COMMENT:
      const editupdatedcomments = state.comments.map((comment, index) => {
        if(comment.id === action.comment.id) {
          return action.comment
        } else {
          return comment
        }
      })

      return {...state, comments: editupdatedcomments}
    default:
      return state

  }
}
