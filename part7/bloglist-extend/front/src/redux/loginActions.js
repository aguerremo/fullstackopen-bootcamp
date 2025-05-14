import loginService from '../services/login'

export const loginUser = (credentials) => {
  return async dispatch => {
    try{
      const user = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN_USER',
        payload: user
      })
      return user
    } catch (error){
      console.log('Error login: ', error)
      throw error
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT_USER',
      payload: null
    })
  }
}