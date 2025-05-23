const initialState = null

const loginReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'LOGIN_USER':
    return action.payload
  case 'LOGOUT_USER':
    return state
  default:
    return state
  }
}

export default loginReducer