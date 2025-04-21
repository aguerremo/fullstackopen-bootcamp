export default function LoginForm ({ setPassword, setUsername, handleLogin, username, password }) {

  return <form onSubmit={handleLogin}>
    <div>
      <input
        type="text"
        data-testid='username'
        value={username}
        name='Username'
        placeholder='Username'
        onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div>
      <input
        type="password"
        data-testid='password'
        value={password}
        name='Password'
        placeholder='Password'
        onChange={({ target }) => setPassword(target.value)} />
    </div>
    <button>Login</button>

  </form>
}