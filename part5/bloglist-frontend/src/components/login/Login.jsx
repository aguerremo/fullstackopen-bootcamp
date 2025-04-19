import loginService from '../../services/login'
import blogService from '../../services/blogs'
import { Notifications } from '../notifications/Notifications'
import LoginForm from './LoginForm'
import { useState } from 'react'

export const Login = ({setUser}) => {
  
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
     })

     window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      console.log('Wrong Credentials')
      console.log(errorMessage)
    }
     
   }
   return <div>
    <h2>Log in</h2>
    <Notifications setErrorMessage={setErrorMessage} errorMessage={errorMessage} doneMessage={null}/>
    <LoginForm handleLogin={handleLogin} setPassword={setPassword} setUsername={setUsername} username={username} password={password} setUser={setUser} setErrorMessage={setErrorMessage} errorMessage={errorMessage}/>

   </div>
   
}

