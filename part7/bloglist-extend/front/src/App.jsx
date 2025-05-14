import Blogs from './Blogs'
import Users from './Users'
import { BrowserRouter, Link, Route, Routes } from 'react-router'

const Home = () => <h1>Home Page</h1>

const Blog = () => <h1>Blog Page</h1>

const User = () => <h1>User Page</h1>

const App = () => {

  const styles = {
    padding: 5
  }

  return <BrowserRouter>
    <header>
      <Link to='/' style={styles}>Home</Link>
      <Link to='/blogs' style={styles}>Blogs</Link>
      <Link to='/users' style={styles}>Users</Link>
    </header>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/blogs' element={<Blogs/>} />
      <Route path='/users' element={<Users/>} />
    </Routes>
  </BrowserRouter>
}


export default App

