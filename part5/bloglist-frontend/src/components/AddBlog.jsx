import { InputButton } from "./InputButton";

export const AddBlog = ({newAuthor, setNewAuthor, newBlog, setNewBlog}) => {
      
    const addBlog = (event) => {
      event.preventDefault()
   }    

    return <div>
    <h2>add a new blog</h2>
    <form  onSubmit={addBlog}>
     
    <div>
      <InputButton newBlog={newBlog} newAuthor={newAuthor} setNewAuthor={setNewAuthor} setNewBlog={setNewBlog}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </div>
  }