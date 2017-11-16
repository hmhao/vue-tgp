const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

router.get('/index/header', (req, res, next) => {
  res.result = {
    code: 0,
    message: '',
    data: Mock.mock({
      'banners|6': [{
        'poster': '@IMAGE("750x560", @COLOR, @COLOR, @TITLE(3))',
        'target_type': 2,
        'target_url': '',
        'target_id': '@INTEGER(100000, 999999)'
      }],
      'entries|4': [{
        'id|+1': 1,
        'name': '@CNAME()',
        'name_display': 1,
        'icon': '@IMAGE("70x70", @COLOR, @COLOR, @TITLE(3))'
      }]
    })
  }
  return next()
})

router.get('/index/block', (() => {
  const total = Mock.Random.integer(10, 100),
    per_page = 10,
    last_page = Math.ceil(total / per_page)
  return (req, res, next) =>{
    let page = ~~req.query.page || 1,
      has_next = page < last_page
    res.result = {
      code: 0,
      message: '',
      data: {
        total,
        per_page,
        current_page: page,
        has_next_page: ~~has_next,
        blocks: [
          Mock.mock({
            'block_id': 1,
            'title': '热门精选',
            'title_display': 1,
            'style': 1,
            'target_type': 1,
            'target_link': '',
            'more_title': '查看更多',
            'more_status': 1,
            'more_num': '@INTEGER(10, 50)',
            'content|4': [{
              'type': 1,
              'up_id': '@INTEGER(1000000000, 9999999999)',
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(8, 16)',
              'length': '@INTEGER(0, 1)@INTEGER(0, 9)\'@INTEGER(0, 5)@INTEGER(0, 9)',
              'up_user': '@CTITLE(5, 10)',
              'image': '@IMAGE("750x420", @COLOR, @COLOR)',
              'extra_id': 0,
              'up_image': '@IMAGE("150x150", @COLOR, @COLOR)'
            }]
          }),
          Mock.mock({
            'block_id': 2,
            'title': '新片预告',
            'title_display': 1,
            'style': 2,
            'target_type': 1,
            'target_link': '',
            'more_title': '点击查看更多',
            'more_status': 1,
            'more_num': '@INTEGER(10, 50)',
            'content|4': [{
              'type': 4,
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(8, 16)',
              'length': '@INTEGER(0, 1)@INTEGER(0, 9)\'@INTEGER(0, 5)@INTEGER(0, 9)',
              'image': '@IMAGE("750x420", @COLOR, @COLOR)',
              'poster': '@IMAGE("400x600", @COLOR, @COLOR)',
              'target_id': '@INTEGER(100000, 999999)',
              'target_name': '@CTITLE(1, 8)',
              'extra_id': '@INTEGER(100000, 999999)'
            }]
          }),
          Mock.mock({
            'block_id': 3,
            'title': '主题看单',
            'title_display': 0,
            'style': 4,
            'target_type': 4,
            'target_link': '',
            'more_title': '点击查看更多',
            'more_status': 1,
            'more_num': '@INTEGER(10, 50)',
            'playlist_id': '@INTEGER(1, 999)',
            'subject': '@CTITLE(8, 20)',
            'description': '@CTITLE(20, 60)',
            'comment_nums': 0,
            'view_nums': '@INTEGER(0, 100)',
            'content_nums': 10,
            'up_id': '@INTEGER(1000000000, 9999999999)',
            'up_user': '@CTITLE(5, 10)',
            'up_image': '@IMAGE("150x150", @COLOR, @COLOR)',
            'content|10': [{
              'type': 2,
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(2, 8)',
              'image': '@IMAGE("250x350", @COLOR, @COLOR)',
              'description': '@CTITLE(8, 20)'
            }],
            'created_at_format': '@INTEGER(1, 30)天前'
          }),
          Mock.mock({
            'block_id': 4,
            'title': '@CTITLE(4, 6)',
            'title_display': 1,
            'style': 1,
            'target_type': 3,
            'target_link': '',
            'more_title': '点击查看更多',
            'more_status': 0,
            'more_num': '@INTEGER(10, 50)',
            'content|4': [{
              'type': 1,
              'up_id': '@INTEGER(1000000000, 9999999999)',
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(8, 16)',
              'length': '@INTEGER(0, 1)@INTEGER(0, 9)\'@INTEGER(0, 5)@INTEGER(0, 9)',
              'up_user': '@CTITLE(5, 10)',
              'image': '@IMAGE("750x420", @COLOR, @COLOR)',
              'extra_id': 0,
              'up_image': '@IMAGE("150x150", @COLOR, @COLOR)'
            }]
          }),
          Mock.mock({
            'block_id': 5,
            'title': '趣味解说',
            'title_display': 1,
            'style': 1,
            'target_type': 1,
            'target_link': '',
            'more_title': '查看更多',
            'more_status': 1,
            'more_num': '@INTEGER(10, 50)',
            'content|4': [{
              'type': 1,
              'up_id': '@INTEGER(1000000000, 9999999999)',
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(8, 16)',
              'length': '@INTEGER(0, 1)@INTEGER(0, 9)\'@INTEGER(0, 5)@INTEGER(0, 9)',
              'up_user': '@CTITLE(5, 10)',
              'image': '@IMAGE("750x420", @COLOR, @COLOR)',
              'extra_id': 0,
              'up_image': '@IMAGE("150x150", @COLOR, @COLOR)'
            }]
          }),
          Mock.mock({
            'block_id': 6,
            'title': '推荐up主',
            'title_display': 1,
            'style': 5,
            'up_content|2': [{
              'up_id': '@INTEGER(1000000000, 9999999999)',
              'up_user': '@CTITLE(5, 10)',
              'up_image': '@IMAGE("150x150", @COLOR, @COLOR)',
              'is_focus': 0,
              'up_tags|1-4': ['@CTITLE(2, 5)'],
              'list|1-5': [{
                'video_id': '@INTEGER(100000, 999999)',
                'video_name': '@CTITLE(8, 16)',
                'length': '@INTEGER(0, 1)@INTEGER(0, 9)\'@INTEGER(0, 5)@INTEGER(0, 9)',
                'poster': '@IMAGE("750x420", @COLOR, @COLOR)',
              }]
            }]
          }),
          Mock.mock({
            'block_id': 3,
            'title': '主题看单',
            'title_display': 0,
            'style': 4,
            'target_type': 4,
            'target_link': '',
            'more_title': '点击查看更多',
            'more_status': 1,
            'more_num': '@INTEGER(10, 50)',
            'playlist_id': '@INTEGER(1, 999)',
            'subject': '@CTITLE(8, 20)',
            'description': '@CTITLE(20, 60)',
            'comment_nums': 0,
            'view_nums': '@INTEGER(0, 100)',
            'content_nums': 10,
            'up_id': '@INTEGER(1000000000, 9999999999)',
            'up_user': '@CTITLE(5, 10)',
            'up_image': '@IMAGE("150x150", @COLOR, @COLOR)',
            'content|10': [{
              'type': 2,
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(2, 8)',
              'image': '@IMAGE("250x350", @COLOR, @COLOR)',
              'description': '@CTITLE(8, 20)'
            }],
            'created_at_format': '@INTEGER(1, 30)天前'
          }),
          Mock.mock({
            'block_id': 3,
            'title': '主题看单',
            'title_display': 0,
            'style': 4,
            'target_type': 4,
            'target_link': '',
            'more_title': '点击查看更多',
            'more_status': 1,
            'more_num': '@INTEGER(10, 50)',
            'playlist_id': '@INTEGER(1, 999)',
            'subject': '@CTITLE(8, 20)',
            'description': '@CTITLE(20, 60)',
            'comment_nums': 0,
            'view_nums': '@INTEGER(0, 100)',
            'content_nums': 10,
            'up_id': '@INTEGER(1000000000, 9999999999)',
            'up_user': '@CTITLE(5, 10)',
            'up_image': '@IMAGE("150x150", @COLOR, @COLOR)',
            'content|10': [{
              'type': 2,
              'sid': '@INTEGER(100000, 999999)',
              'name': '@CTITLE(2, 8)',
              'image': '@IMAGE("250x350", @COLOR, @COLOR)',
              'description': '@CTITLE(8, 20)'
            }],
            'created_at_format': '@INTEGER(1, 30)天前'
          }),
        ]
      }
    }
    return next()
  }
})())

router.get('/ranking/hot_video', (() => {
  const total = Mock.Random.integer(10, 100),
    per_page = 10,
    last_page = Math.ceil(total / per_page)
  return (req, res, next) =>{
    let page = ~~req.query.page || 1,
        has_next = page < last_page,
        num = has_next ? per_page : total % per_page
    res.result = {
      code: 0,
      message: '',
      data: Mock.mock({
        total,
        per_page,
        current_page: page,
        has_next_page: ~~has_next,
        [`videos|${num}`]: [{
          'video_id': '@INTEGER(100000, 999999)',
          'poster': '@IMAGE("414x232", @COLOR, @COLOR)',
          'title': '@CTITLE(8, 20)',
          'user_id': '@INTEGER(1000000000, 9999999999)',
          'nickname': '@CTITLE(2, 6)',
          'play_num': '@INTEGER(0, 10000)',
          'comments_num': '@INTEGER(0, 100)',
          'play_length': '@INTEGER(0, 5)@INTEGER(0, 9):@INTEGER(0, 5)@INTEGER(0, 9)',
        }]
      })
    }
    return next()
  }
})())

router.get('/ranking/top_upuser', (() => {
  const total = Mock.Random.integer(10, 200),
    per_page = 20,
    last_page = Math.ceil(total / per_page)
  return (req, res, next) =>{
    let page = ~~req.query.page || 1,
      has_next = page < last_page,
      num = has_next ? per_page : total % per_page
    res.result = {
      code: 0,
      message: '',
      data: Mock.mock({
        total,
        per_page,
        current_page: page,
        has_next_page: ~~has_next,
        [`upusers|${num}`]: [{
          'user_id': '@INTEGER(1000000000, 9999999999)',
          'score': '@INTEGER(0, 99999)',
          'is_focused': 0,
          'nickname': '@CTITLE(2, 6)',
          'avatar': '@IMAGE("150x150", @COLOR, @COLOR)',
          'tags|1-5': ['@CTITLE(2, 4)']
        }]
      })
    }
    return next()
  }
})())

router.get('/ranking/tickets', (() => {
  const total = Mock.Random.integer(10, 50),
    per_page = 20,
    last_page = Math.ceil(total / per_page)
  return (req, res, next) =>{
    let page = ~~req.query.page || 1,
      has_next = page < last_page,
      num = has_next ? per_page : total % per_page
    res.result = {
      code: 0,
      message: '',
      data: Mock.mock({
        total,
        per_page,
        current_page: page,
        has_next_page: ~~has_next,
        [`movie|${num}`]: [{
          'movie_id': '@INTEGER(0, 99999)',
          'name': '@CTITLE(2, 8)',
          'score': '@FLOAT(0, 10, 0, 1)',
          'release_date': '@DATE()',
          'directors|1-2': ['@CNAME()'],
          'actors|4-10': ['@CNAME()'],
          'poster': '@IMAGE("414x580", @COLOR, @COLOR)',
          'tickets': '@FLOAT(1, 10, 0, 2)亿',
          'now_tickets': '@FLOAT(0, 9999, 0, 2)万',
          'type|1-4': ['@CTITLE(2, 3)'],
          'play_length': '@INTEGER(40, 150)',
        }]
      })
    }
    return next()
  }
})())

router.get('/ranking/hot_tv', (() => {
  const total = Mock.Random.integer(10, 50),
    per_page = 20,
    last_page = Math.ceil(total / per_page)
  return (req, res, next) =>{
    let page = ~~req.query.page || 1,
      has_next = page < last_page,
      num = has_next ? per_page : total % per_page
    res.result = {
      code: 0,
      message: '',
      data: Mock.mock({
        total,
        per_page,
        current_page: page,
        has_next_page: ~~has_next,
        [`movie|${num}`]: [{
          'movie_id': '@INTEGER(0, 99999)',
          'name': '@CTITLE(2, 8)',
          'score': '@FLOAT(0, 10, 0, 1)',
          'release_date': '@DATE()',
          'directors|1-2': ['@CNAME()'],
          'actors|4-10': ['@CNAME()'],
          'poster': '@IMAGE("414x580", @COLOR, @COLOR)',
          'section_info': '',
          'playtimes': '@FLOAT(100, 9999, 0, 2)万'
        }]
      })
    }
    return next()
  }
})())

router.get('/cate', (req, res, next) => {
  res.result = Mock.mock({
    code: 0,
    message: '',
    'data|8-20': [{
      'id|+1': 0,
      'title': '@CTITLE(2, 4)'
    }]
  })
  return next()
})

router.all('*', (req, res) => {
  res[req.query.callback ? 'jsonp' : 'json'](res.result)
})

module.exports = router