export const Logout = ({user, setUser}) => {
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)


  }

  return <div>
    <p>{user.name} has been logged</p>
    <button onClick={handleLogout}>logout</button>
  </div>
  
}