import { InputButton } from "./InputButton"
import blogService from "../services/blogs"
import { Notifications } from './Notifications'


export const AddBlog = ({newBlog, setNewBlog, setBlogs, setDoneMessage, setErrorMessage, errorMessage, doneMessage, addBLogVisible, setAddBlogVisible}) => {

  const hideWhenVisible = { display: addBLogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBLogVisible ? '' : 'none' }

      
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
  <div>
    <h3>Add a new blog</h3>
    <Notifications setErrorMessage={setErrorMessage} errorMessage={errorMessage} doneMessage={doneMessage} setDoneMessage={setDoneMessage}/>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>Create Blog</button>
      </div>
      <div style={showWhenVisible}>
        <form  onSubmit={addNewBlog}>
          <InputButton newBlog={newBlog} setNewBlog={setNewBlog}/>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setAddBlogVisible(false)}>Cancel</button>
      </div>
  </div>
  )
}