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
    try {
      const createdBlog = await blogsService.create(newBlog)
      dispatch({
        type: 'ADD_BLOG',
        payload: createBlogs
      })
    } catch (error) {
      console.log('Error creating blog: ', error)
      dispatch(setNotification('Error creating blog', 'error', 5))
    }
  }
}