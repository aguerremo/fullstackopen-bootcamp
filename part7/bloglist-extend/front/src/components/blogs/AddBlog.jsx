import { InputButton } from './InputButton'
import blogService from '../../services/blogs'
import Togglable from '../Togglable'
import { useState, useRef } from 'react'
import { setNotification } from '../../redux/notificationActions'
import { useDispatch } from 'react-redux'
import { Notifications } from '../notifications/Notifications'
import { createBlogs, initialBlogs } from '../../redux/blogsActions'


export const AddBlog = () => {
  const dispatch = useDispatch()

  const togglableRef = useRef()

  const addNewBlog = async (event) => {
    const newBlog = {
      author: event.author,
      title: event.title,
      url: event.url,
      likes: 0,
    }
    try {
      event.preventDefault()
      console.log('enviando: ', newBlog)
      dispatch(createBlogs(newBlog))
      console.log('success!', newBlog)
      togglableRef.current.toggleVisible()
      dispatch(initialBlogs())
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
          <InputButton />
          <button type="submit">Submit</button>
        </form>
      </Togglable>
    </div>
  )
}
