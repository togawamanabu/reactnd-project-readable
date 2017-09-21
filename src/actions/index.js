import uuidv4 from 'uuid/v4';

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POSTS = 'ADD_POSTS'
export const GET_CATEGORY_POST = 'GET_CATEGORY_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_POST = 'CREATE_POST'
export const GET_POST = 'GET_POST'
export const VOTE_POST = 'VOTE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_ALL_POST = 'GET_ALL_POST'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'

const API = 'http://localhost:3001'

export function getPostAction(post_id) {
  return dispatch => {fetch(`${API}/posts/${post_id}` ,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
     .then(data => {
      dispatch({
          type: GET_POST,
          post_id: post_id,
          data: data,
        })
    })
  }
}

export function getCategoriesAction() {
  return dispatch => {fetch(`${API}/categories`,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
     .then(data => {
      dispatch({
        type: ADD_CATEGORIES,
        data,
      })
    })
  }
}

export function getAllPostsAction() {
  return dispatch => {fetch(`${API}/posts`,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
     .then(data => {
       console.log("return")
      dispatch({
        type: GET_ALL_POST,
        posts: data,
      })
    })
  }
}

export function getCategoryPosts(category) {
  return dispatch => {fetch(`${API}/${category}/posts`,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
     .then(data => {
      dispatch({
        type: GET_CATEGORY_POST,
        posts: data,
      })
    })
  }
}


export function addPostsAction(posts) {
  return {
    type: ADD_POSTS,
    posts,
  }
}

export function deletePostAction(post_id) {
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

export function createPostAction(title, body, author, category) {
  const timestamp = (new Date()).getTime()

  var payload = {
    id: uuidv4(),
    title: title,
    timestamp: timestamp,
    body: body,
    author: author,
    category: category,
  }

  return dispatch => {
     fetch(`${API}/posts`, {
       method: 'POST',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
       body: JSON.stringify(payload)
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: CREATE_POST,
         newpost: data,
       })
     })
  }
}

export function editPostAction(post_id, title, body) {
  var payload = {
    title: title,
    body: body,
  }

  return dispatch => {
     fetch(`${API}/posts/${post_id}`, {
       method: 'PUT',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
       body: JSON.stringify(payload)
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: EDIT_POST,
         post: data,
       })
     })
  }
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

export function getPostCommentAction(post_id) {
  return dispatch => {
    fetch(`${API}/posts/${post_id}/comments` ,{ headers: { 'Authorization': 'whatever-you-want' } })
      .then((res) => res.json())
       .then(data => {
        dispatch({
          type: GET_COMMENTS,
          post_id: post_id,
          comments: data
        })
      })
    }
}

export function voteCommentAction(comment_id, upordown) {
  return dispatch => {
     fetch(`${API}/comments/${comment_id}`, {
       method: 'POST',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
       body: JSON.stringify({option: upordown})
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: VOTE_COMMENT,
         comment: data,
       })
     })
  }
}

export function deleteCommentAction(comment_id) {
  return dispatch => {
     fetch(`${API}/comments/${comment_id}`, {
       method: 'DELETE',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: DELETE_COMMENT,
         comment: data,
       })
     })
  }
}

export function createCommentAction(post_id, body, author) {
  const timestamp = (new Date()).getTime()

  var payload = {
    id: uuidv4(),
    timestamp: timestamp,
    body: body,
    author: author,
    parentId: post_id,
  }

  return dispatch => {
     fetch(`${API}/comments`, {
       method: 'POST',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
       body: JSON.stringify(payload)
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: CREATE_COMMENT,
         comment: data,
       })
     })
  }
}

export function editCommentAction(comment_id, body) {
  const timestamp = (new Date()).getTime()

  var payload = {
    timestamp: timestamp,
    body: body,
  }

  return dispatch => {
     fetch(`${API}/comments/${comment_id}`, {
       method: 'PUT',
       headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
       body: JSON.stringify(payload)
     }).then((res) => res.json())
      .then(data => {
       dispatch({
         type: EDIT_COMMENT,
         comment: data,
       })
     })
  }
}
