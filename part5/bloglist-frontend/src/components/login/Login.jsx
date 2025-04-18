import loginService from '../../services/login'
import blogService from '../../services/blogs'
import { Notifications } from '../Notifications'
import LoginForm from './LoginForm'


export const Login = ({setPassword, setUsername, username, password, setUser, setErrorMessage, errorMessage, doneMessage}) => {
  
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

