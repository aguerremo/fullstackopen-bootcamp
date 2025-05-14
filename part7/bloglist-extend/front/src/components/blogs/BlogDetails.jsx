import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import blogsService from '../../services/blogs'
import Likes from './LikeButton'
import { addComment } from '../../redux/blogsActions'

export const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(addComment(blog.id, newComment))
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <Likes blog={blog}/> </div>
      <div>added by: {blog.author}</div>

      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}