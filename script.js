//email": eve.holt@reqres.in
//password": cityslicka
const init = () => {
  const validateEmail = event => {
    console.log(event)
    const input = event.currentTarget
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailTest = regex.test(input.value)

    if (!emailTest) {
      if (input.value.length != 0) {
        submitButton.setAttribute('disabled', 'disabled')
        input.nextElementSibling.classList.add('error')
      } else {
        submitButton.removeAttribute('disabled', 'disabled')
        input.nextElementSibling.classList.remove('error')
      }
    } else {
      submitButton.removeAttribute('disabled', 'disabled')
      input.nextElementSibling.classList.remove('error')
    }
  }

  const validatePassword = event => {
    const input = event.currentTarget

    if (input.value.length != 0) {
      if (input.value.length < 8) {
        submitButton.setAttribute('disabled', 'disabled')
        input.nextElementSibling.classList.add('error')
      } else {
        submitButton.removeAttribute('disabled', 'disabled')
        input.nextElementSibling.classList.remove('error')
      }
    } else {
      submitButton.removeAttribute('disabled', 'disabled')
      input.nextElementSibling.classList.remove('error')
    }
  }

  const inputEmail = document.querySelector('input[type="email"]')
  const inputPassword = document.querySelector('input[type="password"]')
  const submitButton = document.querySelector('.login_submit')

  inputEmail.addEventListener('input', validateEmail)
  inputPassword.addEventListener('input', validatePassword)

  const errorHandler = () => {
    submitButton.classList.remove('success')
    submitButton.classList.add('error')
    submitButton.textContent = 'Erro'

    setTimeout(() => {
      submitButton.classList.remove('error')
      submitButton.textContent = 'Login'
    }, 5000)
  }

  const successHandler = () => {
    submitButton.classList.remove('error')
    submitButton.classList.add('success')
    submitButton.textContent = 'Sent!'

    setTimeout(() => {
      submitButton.classList.remove('success')
      submitButton.textContent = 'Login'
    }, 5000)
  }

  if (submitButton) {
    submitButton.addEventListener('click', event => {
      event.preventDefault()

      submitButton.textContent = '...Loging'

      fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail.value,
          password: inputPassword.value
        })
      })
        .then(response => {
          if (response.status != 200) {
            errorHandler()
          } else {
            successHandler()
          }
        })
        .catch(() => {
          errorHandler()
        })
    })
  }
}

window.onload = init
