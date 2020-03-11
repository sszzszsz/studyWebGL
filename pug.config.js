/* eslint-disable camelcase */
const url = '/'
const local_url = '/'
const title = {
  home: 'TOP',
  demo1: '下層ページのタイトル'
}
const description = {
  home: 'TOPページの説明文',
  demo1: '下層ページの説明文'
}
const favicon = '/img/favicon.ico'

module.exports = {
  data: [
    {
      name: 'pagelist',
      url: url + 'pagelist.html',
      local_url: local_url + 'pagelist.html',
      title: '画面一覧',
      page_title: '画面一覧',
      level: 0,
      description: '',
      keywords: '',
      favicon: favicon,
      dev_state: ''
    }, {
      name: 'home',
      url: url,
      local_url: local_url,
      title: title.home,
      page_title: 'トップページ',
      level: 1,
      description: description.home,
      keywords: '',
      favicon: favicon,
      dev_state: 'テストアップ'
    }, {
      name: 'demo1',
      url: url + 'practice/demo1.html',
      local_url: local_url + 'practice/demo1.html',
      title: title.page,
      page_title: '下層ページ',
      level: 1,
      description: description.page,
      keywords: '',
      favicon: favicon,
      dev_state: 'テストアップ'
    }, {
      name: 'demo2',
      url: url + 'practice/demo2.html',
      local_url: local_url + 'practice/demo2.html',
      title: title.page,
      page_title: '下層ページ',
      level: 1,
      description: description.page,
      keywords: '',
      favicon: favicon,
      dev_state: 'テストアップ'
    }
  ]
}
