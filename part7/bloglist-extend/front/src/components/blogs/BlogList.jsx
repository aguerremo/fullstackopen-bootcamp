import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { useEffect } from 'react'
import { initialBlogs } from '../../redux/blogsActions'

const BlogList = ({ user, setBlogs }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])
  return (
    <div>
      <h3>Blog list:</h3>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Blog blog={blog} setBlogs={setBlogs} user={user} />
          </div>
        ))}
    </div>
  )
}

export default BlogList
