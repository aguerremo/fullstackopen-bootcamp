import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import filterReducer from './reducers/filterReducer'
import anecdotesReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer
})
const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterReducer('ALL'))
store.dispatch(anecdotesReducer('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)