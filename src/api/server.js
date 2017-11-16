import _fetch from 'node-fetch'
import LRU from 'lru-cache'
import queue from './queue'

// this piece of code may run multiple times in development mode,
// so we attach the instantiated API to `process` to avoid duplications
const api = process.__API__ || (process.__API__ = {
  // fetched item cache
  /*cachedItems: LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  }),*/
  queue
})

const logRequests = !!process.env.DEBUG_API

export function fetch (url, option) {
  logRequests && console.log(`fetching ${url}...`)
  const cache = api.cachedItems
  if (cache && cache.has(url)) {
    logRequests && console.log(`cache hit for ${url}.`)
    return Promise.resolve(cache.get(url))
  } else {
    return new Promise((resolve, reject) => {
      if (!api.queue.has(url)){
        api.queue.on(url, {resolve, reject})
        _fetch(url, option)
          .then(res => res.json())
          .then(res => {
            // mark the timestamp when this item is cached
            if (res) {
              res.__lastUpdated = Date.now()
              cache && cache.set(url, res)
              logRequests && console.log(`fetched ${url}.`)
            }
            api.queue.emit(url, res)
          })
      }
    })
  }
}
