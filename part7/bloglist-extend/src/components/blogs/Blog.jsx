import Togglable from '../Togglable'
import Likes from './LikeButton'
import Remove from './RemoveBlog'

const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    alignItems: 'center',
    gap: '10px',
  }

  const blogToShow = () => {
    return (
      <div>
        <em>Author:</em> {blog.author}
        <br />
        <em>URL:</em> {blog.url}
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog" data-testid="blog">
      <strong>{blog.title}</strong>
      <Togglable buttonToShow={'more info'} buttonToHide={'close'}>
        {blogToShow()}
      </Togglable>

      <Likes id={blog.id} likes={blog.likes} />

      <Remove setBlogs={setBlogs} user={user} blog={blog} />
    </div>
  )
}

export default Blog
