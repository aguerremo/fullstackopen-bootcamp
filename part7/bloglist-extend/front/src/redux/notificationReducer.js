const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET_NOTIFICATION':
    return action.payload
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer