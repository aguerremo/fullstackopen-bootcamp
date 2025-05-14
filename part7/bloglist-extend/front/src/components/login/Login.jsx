import loginService from '../../services/login'
import blogService from '../../services/blogs'
import LoginForm from './LoginForm'
import { useState } from 'react'
import { setNotification } from '../../redux/notificationActions'
import { useDispatch } from 'react-redux'
import { Notifications } from '../notifications/Notifications'
import { loginUser } from '../../redux/loginActions'
import { useField } from '../../hooks/hooks'

export const Login = ({ setUser }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }
    try {
      const userLogged = await dispatch(loginUser(credentials))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLogged))
      blogService.setToken(userLogged.token)
      setUser(userLogged)

      resetUsername()
      resetPassword()
    } catch (error) {
      dispatch(setNotification(`Wrong credentials. ${error.message}`, 'error', 5))
      console.log('Wrong Credentials')

    }
  }
  return (
    <div>
      <h2>Log in</h2>
      <Notifications/>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            data-testid="username"
            {...username}
            name="Username"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            data-testid="password"
            {...password}
            name="Password"
            placeholder="Password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}
