export default {
  _q: {},
  has (url) {
    return this._q[url] ? !!this._q[url].length : false
  },
  on (url, promise) {
    let q = this._q[url] || (this._q[url] = [])
    q.push(promise)
  },
  emit (url, res) {
    let q = this._q[url]
    while (q.length) {
      q.pop()[res ? 'resolve' : 'reject'](res)
    }
  }
}