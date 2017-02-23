$(document).ready(function () {
  $('.modal').modal()
  $('.button-collapse').sideNav()
})

var app = new Vue({
  el: '#root',
  data: {
    add: {
      date: '',
      frequency: ''
    },
    edit: {
      date: '',
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
        url: 'http://localhost:3000/api/datadate',
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
        url: `http://localhost:3000/api/datadate/search?q=${app.search}&q2=${app.search2}`,
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
        url: 'http://localhost:3000/api/datadate',
        data: {
          date: app.add.date,
          frequency: app.add.frequency
        },
        success: function (resp) {
          app.add.date = '',
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
        url: `http://localhost:3000/api/datadate/${id}`,
        success: function (resp) {
          app.edit._id = resp._id,
          app.edit.date = resp.date,
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
        url: `http://localhost:3000/api/datadate/${id}`,
        data: {
          date: app.edit.date,
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
        url: `http://localhost:3000/api/datadate/${id}`,
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
