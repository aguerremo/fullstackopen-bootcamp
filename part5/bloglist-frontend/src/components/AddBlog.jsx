import { InputButton } from "./InputButton";

export const AddBlog = ({newBlog, setNewBlog}) => {
      
    
   

    return <div>
    <h2>add a new blog</h2>
    <form  onSubmit={AddBlog}>
     
    <div>
      <InputButton newBlog={newBlog} setNewBlog={setNewBlog}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </div>
  }