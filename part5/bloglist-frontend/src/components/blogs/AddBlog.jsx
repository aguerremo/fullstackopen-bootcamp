import { InputButton } from "./InputButton"
import blogService from "../../services/blogs"
import { Notifications } from '../notifications/Notifications'
import Togglable from '../Togglable'

export const AddBlog = ({newBlog, setNewBlog, setBlogs, setDoneMessage, setErrorMessage, errorMessage, doneMessage}) => {
      
  const addNewBlog = async (event) => {
    event.preventDefault()
    console.log('enviando: ', newBlog)
    try {
      const blog = await blogService.create({
        author: newBlog.author,
        title: newBlog.title,
        url: newBlog.url,
        likes: 0
      })
      
    console.log('succes!', blog)
    setNewBlog({ author: '', title: '', url: '' })
    const blogs = await blogService.getAll()
    console.log('Blogs: ', blogs)
    setBlogs(blogs)
    setDoneMessage(blog.title + ' by '+ blog.author +' created succesfully' )

    } catch (error){
      console.log('Error')
      setErrorMessage('Error')
    }
  }
   

  return (
  <Togglable buttonToShow={'Create Blog'} buttonToHide={'Cancel'}>
    <h3>Add a new blog</h3>
    <Notifications setErrorMessage={setErrorMessage} errorMessage={errorMessage} doneMessage={doneMessage} setDoneMessage={setDoneMessage}/>

        <form  onSubmit={addNewBlog}>
          <InputButton newBlog={newBlog} setNewBlog={setNewBlog}/>
          <button type="submit">Submit</button>
        </form>
  </Togglable>
  )
}