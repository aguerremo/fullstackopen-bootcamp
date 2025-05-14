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

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogsService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        payload: id
      })
      dispatch(setNotification('Blog removed successfully', 'success', 6))
    } catch (error) {
      console.log('Error removing blog: ', error)
      dispatch(setNotification('Error removing blog', 'error', 5))
    }
  }
}