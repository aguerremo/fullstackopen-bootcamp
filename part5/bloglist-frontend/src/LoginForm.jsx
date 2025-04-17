export default function LoginForm (props) {

  return <form onSubmit={props.handleLogin}>

     <div>
       <input 
         type="text"
         value={props.username}
         name='Username'
         placeholder='Username'
         onChange={({target})=> props.setUsername(target.value)} />
     </div>
     <div>
       <input 
         type="password"
         value={props.password}
         name='Password'
         placeholder='Password'
         onChange={({target})=> props.setPassword(target.value)} />
     </div>
     <button>Login</button>
    
   </form>
}