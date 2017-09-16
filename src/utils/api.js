export function getCategories() {
  return fetch('//localhost:3001/categories',{ headers: { 'Authorization': 'whatever-you-want' } })
    .then((res) => res.json())
}


export function getAllPosts() {
  return fetch('//localhost:3001/posts',{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
}

export function getComments(post_id) {
  return fetch(`//localhost:3001/posts/${post_id}/comments` ,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
}
