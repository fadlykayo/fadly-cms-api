var app = new Vue({
  el: '#root',
  data: {
    page: sessionStorage.getItem('page') || 'home',
    add: {
      content: '',
      userid: '',
      postedby: '',
      tag: ''
    },
    edit: {
      _id: '',
      content: '',
      userid: '',
      postedby: '',
      tag: ''
    },
    search: '',
    search2: '',
    tweets: []
  },
  methods: {
    changePage: function (url) {
      app.page = url
      sessionStorage.setItem('page', url)
    },
    manipulateContent: function (content) {
      return content.match(/#\w+/g)
    },
    loadTweets: function () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/twatt',
        success: function (resp) {
          app.tweets = resp
        },
        error: function () {
          console.log('GET loadTweets request error')
        }
      })
    },

    searchTweet: function () {
      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/api/twatt/search?q=${app.search}&q2=${app.search2}`,
        success: function (resp) {
          app.tweets = resp
        },
        error: function () {
          console.log('GET loadTweets request error')
        }
      })
    },

    addTweet: function () {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/twatt',
        data: {
          content: app.add.content,
          userid: '58ad60072454f718d66cb760',
          postedby: 'fadly',
          tag: JSON.stringify(app.manipulateContent(app.add.content))
        },
        success: function (resp) {
          app.add.content = '',
          app.tweets.push(resp)
        },
        error: function () {
          console.log('POST addTweet request error')
        }
      })
    },

    getTweet: function (id) {
      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/api/twatt/${id}`,
        success: function (resp) {
          app.edit._id = resp._id,
          app.edit.content = resp.content,
          app.edit.userid = resp.userid,
          app.edit.postedby = resp.postedby,
          app.edit.tag = resp.tag
        },
        error: function () {
          console.log('GET getTweet request error')
        }
      })
    },

    deleteTweet: function (id) {
      $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/twatt/${id}`,
        success: function (resp) {
          app.loadTweets()
        },
        error: function () {
          console.log('DELETE deleteTweet request error')
        }
      })
    }
  }
})
app.loadTweets()
