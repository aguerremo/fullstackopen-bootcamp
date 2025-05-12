import { InputButton } from './InputButton'
import blogService from '../../services/blogs'
import { Notifications } from '../notifications/Notifications'
import Togglable from '../Togglable'
import { useState, useRef } from 'react'

export const AddBlog = ({ setBlogs }) => {
  const [doneMessage, setDoneMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      console.log('HOLAAAAAAAAAAAAAAA')
      console.log('succes!', blog)
      setNewBlog({ author: '', title: '', url: '' })
      togglableRef.current.toggleVisible()
      const blogs = await blogService.getAll()
      console.log('Blogs: ', blogs)
      setBlogs(blogs)
      setDoneMessage(blog.title + ' by ' + blog.author + ' created succesfully')
    } catch (error) {
      console.log('Error', error.response ? error.response.data : error.message)
      setErrorMessage(error.response ? error.response.data.error : 'Error creating blog')
    }
  }

  return (
    <div>
      <Notifications
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        doneMessage={doneMessage}
        setDoneMessage={setDoneMessage}
      />
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
