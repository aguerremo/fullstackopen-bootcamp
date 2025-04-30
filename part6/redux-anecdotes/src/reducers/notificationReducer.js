import { createSlice } from "@reduxjs/toolkit";

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(notificationAction(
      message
    ))
    console.log('setNotification Lanzado')
    setTimeout(() => {dispatch(notificationAction(''))}, seconds * 1000)
  }
}


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers:{
    notificationAction(state,action){
      return action.payload
    }
  }
})

export default notificationSlice.reducer
export const {notificationAction} = notificationSlice.actions