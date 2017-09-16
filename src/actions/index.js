export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POSTS = 'ADD_POSTS'

export function addCategories ({categories}) {
  return {
    type: ADD_CATEGORIES,
    categories,
  }
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  }
}
