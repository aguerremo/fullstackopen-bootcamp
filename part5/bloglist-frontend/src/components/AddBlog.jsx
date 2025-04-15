import { InputButton } from "./InputButton"
import blogService from "../services/blogs"


export const AddBlog = ({newBlog, setNewBlog, setBlogs}) => {
      
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

    } catch (error){
      console.log('Error')
    }
  }
   

  return <div>
  <h2>add a new blog</h2>
  <form  onSubmit={addNewBlog}>
   
  <div>
    <InputButton newBlog={newBlog} setNewBlog={setNewBlog}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
</div>

}