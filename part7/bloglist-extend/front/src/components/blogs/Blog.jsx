import Togglable from '../Togglable'
import Likes from './LikeButton'
import Remove from './RemoveBlog'
import { Link } from 'react-router'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    alignItems: 'center',
    gap: '10px',
  }

  console.log('blog:', blog)
  console.log('blog.id:', blog.id)


  return (
    <div style={blogStyle} className="blog" data-testid="blog">
      <Link to={`/blogs/${blog.id}`}>
        <strong>{blog.title}</strong>
      </Link>
      <Likes blog={blog}/>
      <Remove user={user} blog={blog} />

    </div>
  )
}

export default Blog
