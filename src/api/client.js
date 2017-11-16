import _fetchJsonp from 'fetch-jsonp'
import queue from './queue'

// this piece of code may run multiple times in development mode,
// so we attach the instantiated API to `process` to avoid duplications
const api = {
  queue
}

const logRequests = true

export function fetch (url, option) {
  if (api.queue.has(url)) return Promise.reject('Repeat request')

  return new Promise((resolve, reject) => {
    api.queue.on(url, {resolve, reject})
    _fetchJsonp(url, option)
      .then(res => res.json())
      .then(res => {
        // mark the timestamp when this item is cached
        if (res) {
          res.__lastUpdated = Date.now()
          logRequests && console.log(`fetched ${url}.`)
        }
        api.queue.emit(url, res)
      })
  })
}