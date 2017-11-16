import { fetch, resource } from '../api'

export default {
  FETCH_INDEX_HEADER: ({ commit, dispatch, state }) => {
    return fetch(resource.INDEX_HEADER + '?platform=1')
      .then(res => {
        if (res.code === 0) {
          commit('INDEX_HEADER', res)
        } else {
          console.log(`fetch ${resource.INDEX_HEADER} error: ${res.message}`)
        }
      })
  },
  FETCH_INDEX_BLOCK: ({ commit, dispatch, state }) => {
    return fetch(resource.INDEX_BLOCK)
      .then(res => {
        if (res.code === 0) {
          commit('INDEX_BLOCK', res)
        } else {
          console.log(`fetch ${resource.INDEX_BLOCK} error: ${res.message}`)
        }
      })
  },
  FETCH_INDEX_LIST: ({ commit, dispatch, state }, {type, page = 1}) => {
    let listType = `INDEX_LIST_${type.toUpperCase()}`,
        listStatus = state[`list_${type}`].status || {},
        url = resource[listType]
    if (url && !listStatus[page]) {
      return fetch(url + `?page=${page}`)
        .then(res => {
          if (res.code === 0) {
            commit(listType, res)
          } else {
            console.log(`fetch ${resource[listType]} error: ${res.message}`)
          }
        })
    }
  },
  FETCH_INDEX_CATEGORY: ({ commit, dispatch, state }) => {
    return state.category.length === 0 && fetch(resource.INDEX_CATEGORY)
      .then(res => {
        if (res.code === 0) {
          commit('INDEX_CATEGORY', res)
        } else {
          console.log(`fetch ${resource.INDEX_CATEGORY} error: ${res.message}`)
        }
      })
  }
}
