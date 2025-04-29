import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import filterReducer, { filterChange } from './reducers/filterReducer'
import anecdotesReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer
})
const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange(''))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)