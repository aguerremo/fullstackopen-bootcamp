import { createContext, useContext, useReducer } from "react"

const NotificationContext = createContext()


export const setNotification = (dispatch, message, seconds) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message }) // Establece la notificación
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' }) // Limpia la notificación después de `seconds`
  }, seconds * 1000)
}

const notificationReducer = (state = '', action)=> {
  switch(action.type){
    case 'SET_NOTIFICATION': 
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)