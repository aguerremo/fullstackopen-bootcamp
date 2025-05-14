import blogsService from '../services/blogs'
import { setNotification } from './notificationActions'

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      payload: blogs
    })
  }
}

export const createBlogs = (newBlog) => {
  return async dispatch => {
    console.log('Intentando crear blog: ', newBlog)
    try {
      const createdBlog = await blogsService.create(newBlog)
      console.log('createdBlog:', createdBlog)
      dispatch({
        type: 'ADD_BLOG',
        payload: createdBlog
      })
    } catch (error) {
      console.log('Error creating blog: ', error)
      dispatch(setNotification('Error creating blog', 'error', 5))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogsService.remove(blog.id)
      dispatch({
        type: 'REMOVE_BLOG',
        payload: blog.id
      })
      dispatch(setNotification('Blog removed successfully', 'success', 6))
    } catch (error) {
      console.log('Error removing blog: ', error)
      dispatch(setNotification('Error removing blog', 'error', 5))
    }
  }
}

export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    try {
      const { id, ...newObject } = updatedBlog
      const response = await blogsService.update(id, newObject)
      dispatch({
        type: 'UPDATE_BLOG',
        payload: response
      })
      dispatch(setNotification('Blog updated successfully', 'success', 6))
    } catch (error) {
      console.log('Error updating blog: ', error)
      dispatch(setNotification('Error updating blog', 'error', 5))
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.addComment(id, comment)
      dispatch(updateBlog(updatedBlog)) // Actualiza el blog en el estado global
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }
}