const protocol = 'http'
const version = 'api/v1.1'
//const srvhost = 'srv.ttkk.kankan.com'
const srvhost = 'localhost'

const createSrvUrl = function (path, host) {
  host = host || srvhost
  return `${protocol}://${host}/${version}/${path}`
}

export default {
  INDEX_HEADER: createSrvUrl('index/header'), // index 焦点图
  INDEX_BLOCK: createSrvUrl('index/block'), // index 下方栏目
  INDEX_LIST_RENQI: createSrvUrl('ranking/hot_video'), // index 人气榜
  INDEX_LIST_UPUSER: createSrvUrl('ranking/top_upuser'), // index up主排行榜
  INDEX_LIST_PIAOFANG: createSrvUrl('ranking/tickets'), // index 票房榜
  INDEX_LIST_QUANWANG: createSrvUrl('ranking/hot_tv'), // index 全网电视剧榜
  INDEX_CATEGORY: createSrvUrl('cate'), // index 分类
}