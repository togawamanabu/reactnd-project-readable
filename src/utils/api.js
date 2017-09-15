export function getCategories() {
  return fetch('//localhost:3001/categories',{ headers: { 'Authorization': 'whatever-you-want' } })
    .then((res) => res.json())
}
