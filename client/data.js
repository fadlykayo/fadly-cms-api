$(document).ready(function () {
  $('.modal').modal()
  $('.button-collapse').sideNav()
})

var app = new Vue({
  el: '#root',
  data: {
    add: {
      letter: '',
      frequency: ''
    },
    edit: {
      letter: '',
      frequency: ''
    },
    search: '',
    search2: '',
    datas: []
  },
  methods: {
    manipulateContent: function (content) {
      return content.match(/#\w+/g)
    },
    loadDatas: function () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/data',
        success: function (resp) {
          app.datas = resp
        },
        error: function () {
          console.log('GET loadDatas request error')
        }
      })
    },

    searchData: function () {
      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/api/twatt/search?q=${app.search}&q2=${app.search2}`,
        success: function (resp) {
          app.datas = resp
        },
        error: function () {
          console.log('GET loadDatas request error')
        }
      })
    },

    addData: function () {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/data',
        data: {
          letter: app.add.letter,
          frequency: app.add.frequency
        },
        success: function (resp) {
          app.add.letter = '',
          app.add.frequency = '',
          app.datas.push(resp)
        },
        error: function () {
          console.log('POST addData request error')
        }
      })
    },

    getData: function (id) {
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
          console.log('GET getData request error')
        }
      })
    },

    deleteData: function (id) {
      $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/twatt/${id}`,
        success: function (resp) {
          app.loadDatas()
        },
        error: function () {
          console.log('DELETE deleteData request error')
        }
      })
    }
  }
})

app.loadDatas()
