export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POSTS = 'ADD_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_POST = 'CREATE_POST'
export const GET_POST = 'GET_POST'
export const VOTE_POST = 'VOTE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

const API = 'http://localhost:3001'

export function getPostAction(post_id) {
  fetch(`${API}/posts/${post_id}` ,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => {
    console.log(res)
        return ( {
          type: GET_POST,
          post_id: post_id,
          data: res.json(),
        })
  })
}

export function addCategoriesAction ({categories}) {
  return {
    type: ADD_CATEGORIES,
    categories,
  }
}



export function addPostsAction(posts) {
  return {
    type: ADD_POSTS,
    posts,
  }
}

export function deletePostAction(post_id) {
  console.log("delte action", post_id)
  console.log(`${API}/posts/${post_id}`)

  return dispatch => {
     fetch(`${API}/posts/${post_id}`, {
       method: 'DELETE',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: DELETE_POST,
         post: data,
       })
     })
  }
}

export function createPostAction(newpost) {
  return {
    type: CREATE_POST,
    newpost,
  }
}

export function fetchvote() {
  console.log("fetch vote")
}

export function votePostAction(post_id, upordown) {
  return dispatch => {
     fetch(`${API}/posts/${post_id}`, {
       method: 'POST',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
       body: JSON.stringify({option: upordown})
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: VOTE_POST,
         post: data,
       })
     })
  }
}

export function createCommentAction(post_id, name, comment) {
  return {
    type: CREATE_COMMENT,
    post_id,
    name,
    comment
  }
}

export function voteCommentAction(comment_id, score) {
  return {
    type: VOTE_COMMENT,
    comment_id,
    score
  }
}

export function deleteCommentAction(comment_id) {
  return {
    type: DELETE_COMMENT,
    comment_id
  }
}
