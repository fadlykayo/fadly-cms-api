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
        beforeSend: function (request) {
          request.setRequestHeader('token', localStorage.getItem('token'))
        },
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
        url: `http://localhost:3000/api/data/search?q=${app.search}&q2=${app.search2}`,
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
        url: `http://localhost:3000/api/data/${id}`,
        success: function (resp) {
          app.edit._id = resp._id,
          app.edit.letter = resp.letter,
          app.edit.frequency = resp.frequency
        },
        error: function () {
          console.log('GET getData request error')
        }
      })
    },

    editData: function (id) {
      $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/api/data/${id}`,
        data: {
          letter: app.edit.letter,
          frequency: app.edit.frequency
        },
        success: function (resp) {
          app.loadDatas()
        },
        error: function () {
          console.log('PUT editData request error')
        }
      })
    },

    deleteData: function (id) {
      $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/api/data/${id}`,
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

$('.logout').click(function () {
  window.localStorage.clear()
  window.location.assign('http://localhost:8080/login.html')
})

app.loadDatas()
