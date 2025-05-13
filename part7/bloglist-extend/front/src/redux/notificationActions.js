export const setNotification = (message, type, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type },
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}