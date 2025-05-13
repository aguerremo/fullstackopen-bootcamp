import loginService from '../../services/login'
import blogService from '../../services/blogs'
import LoginForm from './LoginForm'
import { useState } from 'react'
import { setNotification } from '../../redux/notificationActions'
import { useDispatch } from 'react-redux'
import { Notifications } from '../notifications/Notifications'

export const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogged = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLogged))

      blogService.setToken(userLogged.token)
      setUser(userLogged)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(`Wrong credentials. ${error.message}`, 'error', 5))
      console.log('Wrong Credentials')

    }
  }
  return (
    <div>
      <h2>Log in</h2>
      <Notifications/>
      <LoginForm
        handleLogin={handleLogin}
        setPassword={setPassword}
        setUsername={setUsername}
        username={username}
        password={password}
        setUser={setUser}
      />
    </div>
  )
}
