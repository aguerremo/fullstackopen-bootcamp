import { InputButton } from './InputButton'
import blogService from '../../services/blogs'
import Togglable from '../Togglable'
import { useState, useRef } from 'react'
import { setNotification } from '../../redux/notificationActions'
import { useDispatch } from 'react-redux'
import { Notifications } from '../notifications/Notifications'


export const AddBlog = ({ setBlogs }) => {
  const dispatch = useDispatch()

  const [newBlog, setNewBlog] = useState({
    author: '',
    title: '',
    url: '',
  })

  const togglableRef = useRef()

  const addNewBlog = async (event) => {
    event.preventDefault()
    console.log('enviando: ', newBlog)
    try {
      const blog = await blogService.create({
        author: newBlog.author,
        title: newBlog.title,
        url: newBlog.url,
        likes: 0,
      })
      console.log('success!', blog)
      setNewBlog({ author: '', title: '', url: '' })
      togglableRef.current.toggleVisible()
      const blogs = await blogService.getAll()
      console.log('Blogs: ', blogs)
      setBlogs(blogs)
      dispatch(setNotification(`Blog "${newBlog.title}" created successfully`,'success',6))
    } catch (error) {
      console.log('Error', error.response ? error.response.data : error.message)
      dispatch(setNotification(`Error creating blog: ${error.message}`, 'error', 5))

    }
  }

  return (
    <div>
      <Notifications />
      <Togglable buttonToShow={'Create Blog'} buttonToHide={'Cancel'} ref={togglableRef}>
        <h3>Add a new blog</h3>

        <form onSubmit={addNewBlog}>
          <InputButton newBlog={newBlog} setNewBlog={setNewBlog} />
          <button type="submit">Submit</button>
        </form>
      </Togglable>
    </div>
  )
}
