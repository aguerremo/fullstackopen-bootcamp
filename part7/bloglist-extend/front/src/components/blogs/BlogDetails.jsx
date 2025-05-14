import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import blogsService from '../../services/blogs'
import Likes from './LikeButton'
import { addComment } from '../../redux/blogsActions'
import { Button } from '../style/Button'
import { Title, Subtitle, Paragraph } from '../style/Text'

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
      <Title>{blog.title}</Title>
      <Subtitle>{blog.url}</Subtitle>
      <Subtitle><Likes blog={blog}/> </Subtitle>
      <Paragraph>added by: {blog.author}</Paragraph>

      <Title>Comments</Title>
      <ul> <Paragraph>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </Paragraph>
      </ul>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <Button type="submit">Add Comment</Button>
      </form>
    </div>
  )
}