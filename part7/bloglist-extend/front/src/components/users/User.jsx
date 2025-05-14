const User = ({ user }) => {
  const userBlogs = user.userBlogs

  return <div>
    {userBlogs}
  </div>
}

export default User