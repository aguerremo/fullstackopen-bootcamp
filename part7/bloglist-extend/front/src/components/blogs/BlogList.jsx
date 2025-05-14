import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { useEffect } from 'react'
import { initialBlogs } from '../../redux/blogsActions'
import { Title, Subtitle, Paragraph } from '../style/Text'


const BlogList = ({ user, setBlogs }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  return (
    <div>
      <Subtitle>Blog list:</Subtitle>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Paragraph>
              <Blog blog={blog} setBlogs={setBlogs} user={user} />
            </Paragraph>
          </div>
        ))}
    </div>
  )
}

export default BlogList
