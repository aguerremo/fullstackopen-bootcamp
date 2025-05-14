import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import usersReducer from './usersReducer'
import loginReducer from './loginReducer'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer,
    login: loginReducer
  }
})

export default store