const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.payload // Actualiza el estado con los usuarios obtenidos
  default:
    return state // Devuelve el estado actual si la acción no coincide
  }
}

export default usersReducer