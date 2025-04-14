import loginService from './services/login'
import blogService from './services/blogs'

export const Login = ({setPassword, setUsername, username, password, setUser}) => {
  
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

      console.log('Wrong Credentials')
    }
     
   }
   return <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
     <div>
       <input 
         type="text"
         value={username}
         name='Username'
         placeholder='Username'
         onChange={({target})=> setUsername(target.value)} />
     </div>
     <div>
       <input 
         type="password"
         value={password}
         name='Password'
         placeholder='Password'
         onChange={({target})=> setPassword(target.value)} />
     </div>
     <button>Login</button>
    
   </form>

   </div>
   
}

