import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import Likes from './LikeButton'



export const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)

  const blog = blogs.find(blog => blog.id === id)
  return(
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <Likes blog={blog}/></div>
      <div>added by: {blog.author}</div>
    </div>


  )
}