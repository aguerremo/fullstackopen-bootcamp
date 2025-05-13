import blogsService from '../services/blogs'

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      payload: blogs
    })
  }
}