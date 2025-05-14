import Togglable from '../Togglable'
import { useRef } from 'react'
import { setNotification } from '../../redux/notificationActions'
import { useDispatch } from 'react-redux'
import { Notifications } from '../notifications/Notifications'
import { createBlogs, initialBlogs } from '../../redux/blogsActions'
import { useField } from '../../hooks/hooks'
import { Button } from '../style/Button'
import { Paragraph, Subtitle } from '../style/Text'


export const AddBlog = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const dispatch = useDispatch()

  const togglableRef = useRef()

  const addNewBlog = async (event) => {
    const newBlog = {
      author: author.value,
      title: title.value,
      url: url.value,
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
      resetAuthor()
      resetTitle()
      resetUrl()
    } catch (error) {
      console.log('Error', error.response ? error.response.data : error.message)
      dispatch(setNotification(`Error creating blog: ${error.message}`, 'error', 5))

    }
  }

  return (
    <div>
      <Notifications />
      <Togglable buttonToShow={'Create Blog'} buttonToHide={'Cancel'} ref={togglableRef}>
        <Subtitle>Add a new blog</Subtitle>

        <form onSubmit={addNewBlog}>
          <Paragraph>
            Author:{' '}
            <input
              {...author}
              placeholder="write author name here"
            />{' '}
            <br />
            Title:{' '}
            <input
              {...title}
              placeholder="write blog title here"
            />{' '}
            <br />
            URL:{' '}
            <input
              {...url}
              placeholder="write url here"
            />{' '}
            <br />
          </Paragraph>
          <Button type="submit">Submit</Button>
        </form>
      </Togglable>
    </div>
  )
}
