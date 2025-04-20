export const Logout = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)


  }

  return <div>
    {user.name} has been logged <br />
    <button onClick={handleLogout}>Logout</button>
  </div>

}