$(document).ready(function () {
  let userEmail = localStorage.getItem('UserEmail')
})

$('#login-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username]').val()
  let passwordVal = $('input[name=password]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/login',
    data: {username: usernameVal, password: passwordVal},
    success: function (resp) {
      if (resp.token) {
        localStorage.setItem('UserEmail', resp.email)
        localStorage.setItem('token', resp.token)
        window.location.assign('http://localhost:8080/home.html')
      }else {
        $('#error-message').text(resp.message)
      }
    },
    error: function (err) {
      console.log('LOGIN Request Error')
      window.location.assign('http://localhost:8080/index.html')
    }
  })
})

$('#register-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username_reg]').val()
  let passwordVal = $('input[name=password_reg]').val()
  let emailVal = $('input[name=email_reg]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/register',
    data: {username: usernameVal, password: passwordVal, email: emailVal},
    success: function (resp) {
      if (resp.errors) {
        if (resp.errors.username) {
          $('#error-message').text(resp.errors.username.message)
        }
        else if (resp.errors.password) {
          $('#error-message').text(resp.errors.password.message)
        }else {
          $('#error-message').text(resp.errors.email.message)
        }
      }else {
        window.location.assign('http://localhost:8080/login.html')
      }
    },
    error: function (err) {
      console.log('REGISTER Request Error')
      window.location.assign('http://localhost:8080/register.html')
    }
  })
})

$('#logout').click(function () {
  window.localStorage.clear()
  window.location.assign('http://localhost:8080/index.html')
})
