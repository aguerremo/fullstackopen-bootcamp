const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET_BLOGS':
    return action.payload
  case 'ADD_BLOG':
    return [...state, action.payload]
  default:
    return state
  }
}

export default blogsReducer