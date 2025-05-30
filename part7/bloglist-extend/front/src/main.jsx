import ReactDOM from 'react-dom/client'
import './components/index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
