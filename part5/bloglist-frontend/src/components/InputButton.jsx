export const InputButton = ({setNewAuthor, setNewBlog, newAuthor, newBlog}) => {

  const handleNewAuthor = (event) => {
      console.log(event.target.value);
      setNewAuthor(event.target.value)
    }
  const handleNewBlog = (event) => {
      console.log(event.target.value);
      setNewBlog(event.target.value)
     
    }
  return<div>
  Author: <input value={newAuthor} onChange={handleNewAuthor}/> <br />
  Blog: <input value={newBlog} onChange={handleNewBlog}/>
</div>
}