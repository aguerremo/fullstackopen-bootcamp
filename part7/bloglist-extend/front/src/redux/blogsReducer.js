const initialState = []

const blogsReducer = (state = initialState, action) => {

  switch (action.type){
  case 'SET_BLOGS': {
    return action.payload
  }
  case 'ADD_BLOG':{
    const newStateAdd = [...state, action.payload]
    return [...state, action.payload]
  }
  case 'UPDATE_BLOG':{
    const updatedBlog = action.payload
    const { id } = updatedBlog
    return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
  }
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.payload)
  default:
    return state
  }
}

export default blogsReducer