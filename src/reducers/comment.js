import {
  CREATE_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  EDIT_COMMENT,
} from '../actions/types'


export function comment (state={comments:{}}, action) {
  switch (action.type) {
    case GET_COMMENTS:

      const newcomments = {...state.comments}
      newcomments[action.post_id] = action.comments.filter( (c) => !c.deleted)

      //{...state.comments, action.comments.filter( (c) => !c.deleted)}

      return {
        ...state,
        comments: newcomments
      }

    case VOTE_COMMENT:
      const parent_id_v = action.comment.parentId

      const voteupdatedcomments = state.comments[parent_id_v].map((comment, index) => {
        if(comment.id === action.comment.id) {
          return action.comment
        } else {
          return comment
        }
      })

      const returnvotedcomments = {...state.comments}
      returnvotedcomments[parent_id_v] = voteupdatedcomments.filter( (c) => !c.deleted)

      return {...state, comments: returnvotedcomments}

    case DELETE_COMMENT:
      const parent_id_d = action.comment.parentId

      const deletedcomments = state.comments[parent_id_d].map((c, index) => {
        if(c.id === action.comment.id) {
          return action.comment
        } else {
          return c
        }
      })

      const returndeletedcomments = {...state.comments}
      returndeletedcomments[parent_id_d] = deletedcomments.filter( (c) => !c.deleted)

      return {...state, comments: returndeletedcomments}

    case CREATE_COMMENT:
      const addedcomment = {...state.comments}
      addedcomment[action.post_id] = addedcomment[action.post_id].concat(action.comment)
      return {
        ...state,
        comments: addedcomment
      }

    case EDIT_COMMENT:
      const parent_id_e = action.comment.parentId
      const editupdatedcomments = state.comments[parent_id_e].map((comment, index) => {
        if(comment.id === action.comment.id) {
          return action.comment
        } else {
          return comment
        }
      })

      const returneditedcomments = {...state.comments}
      returneditedcomments[parent_id_e] = editupdatedcomments.filter( (c) => !c.deleted)

      return {...state, comments: returneditedcomments}
    default:
      return state

  }
}
