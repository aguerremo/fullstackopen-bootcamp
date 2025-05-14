import usersService from '../services/users'

export const initialUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: 'SET_USERS',
        payload: users, // Envía los usuarios obtenidos al reducer
      })
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
}