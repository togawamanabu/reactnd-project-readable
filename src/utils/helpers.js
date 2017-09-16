export function orderByScore(list) {
  list.sort( (a,b) => {
    return a.voteScore < b.voteScore
  })
}

export function orderByTime(list) {
  list.sort( (a,b) => {
    return a.timestamp < b.timestamp
  })
}

export function formatTimestamp(timestamp) {
   const d = new Date( timestamp );
   return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${('00' + d.getHours()).slice(-2)}:${('00' + d.getMinutes()).slice(-2)}`
}
