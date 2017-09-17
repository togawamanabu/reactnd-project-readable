const API = 'http://localhost:3001'

export function getCategories() {
  return fetch(`${API}/categories`,{ headers: { 'Authorization': 'whatever-you-want' } })
    .then((res) => res.json())
}


export function getAllPosts() {
  return fetch(`${API}/posts`,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
}

export function getComments(post_id) {
  return fetch(`${API}/posts/${post_id}/comments` ,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
}

export function getPost(post_id) {
  return fetch(`${API}/posts/${post_id}` ,{ headers: { 'Authorization': 'whatever-you-want' } })
  .then((res) => res.json())
}

export function addNewPost(id, title, body, author, category, timestamp) {
  var payload = {
    id: id,
    timestamp: timestamp,
    title: title,
    body: body,
    author: author,
    category: category,
  }

  return fetch(`${API}/posts`, {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}

export function deletePost(id) {
  return fetch(`${API}/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want' },
  }).then((res) => res.json())
}

export function votePost(id, upordown) {
  return fetch(`${API}/posts/${id}`, {
    method: 'POST',
    headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json" },
    body: JSON.stringify({option: upordown})
  }).then((res) => res.json())
}
