
import filterReducer, {filterAction} from './filterReducer'
import anecdotesReducer from './anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

 export const store = configureStore({
  reducer:{
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }})

  store.subscribe(() => console.log(store.getState()))
  store.dispatch(filterAction(''))