import ReactDOM from 'react-dom/client'
import {  configureStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import filterReducer, { filterChange } from './reducers/filterReducer'
import anecdotesReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer:{
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }})

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange(''))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)