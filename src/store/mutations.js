import Vue from 'vue'

export default {
  INDEX_HEADER: (state, { data }) => {
    state.banners = data.banners
    state.entries = data.entries
  },
  INDEX_BLOCK: (state, { data }) => {
    state.blocks = data.blocks.filter((b) => b.style <= 5)
  },
  INDEX_LIST_RENQI: (state, { data }) => {
    let list = state['list_renqi']
    if (list) {
      list.current_page = data.current_page
      list.has_next_page = data.has_next_page
      list.videos.push(...data.videos)
    } else {
      list = state['list_renqi'] = data
      list.status = {}
    }
    list.status[data.current_page] = 1
  },
  INDEX_LIST_UPUSER: (state, { data }) => {
    let list = state['list_upuser']
    if (list) {
      list.current_page = data.current_page
      list.has_next_page = data.has_next_page
      list.upusers.push(...data.upusers)
    } else {
      list = state['list_upuser'] = data
      list.status = {}
    }
    list.status[data.current_page] = 1
  },
  INDEX_LIST_PIAOFANG: (state, { data }) => {
    let list = state['list_piaofang']
    if (list) {
      list.current_page = data.current_page
      list.has_next_page = data.has_next_page
      list.movie.push(...data.movie)
    } else {
      list = state['list_piaofang'] = data
      list.status = {}
    }
    list.status[data.current_page] = 1
  },
  INDEX_LIST_QUANWANG: (state, { data }) => {
    let list = state['list_quanwang']
    if (list) {
      list.current_page = data.current_page
      list.has_next_page = data.has_next_page
      list.movie.push(...data.movie)
    } else {
      list = state['list_quanwang'] = data
      list.status = {}
    }
    list.status[data.current_page] = 1
  },
  INDEX_CATEGORY: (state, { data }) => {
    state.category = data
  },
}
