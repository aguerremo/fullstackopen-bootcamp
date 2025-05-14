const initialState = []

const blogsReducer = (state = initialState, action) => {
  console.log('Estado previo: ',state)
  console.log('Action recibida: ',action)

  switch (action.type){
  case 'SET_BLOGS': {
    const newStateSet = action.payload
    console.log('Estado despúes de SET_BLOGS: ',newStateSet)
    return action.payload
  }
  case 'ADD_BLOG':{
    const newStateAdd = [...state, action.payload]
    console.log('Estado después de ADD_BLOG: ', newStateAdd)
    return [...state, action.payload]
  }
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.payload)
  default:
    console.log('Estado sin cambios')
    return state
  }
}

export default blogsReducer