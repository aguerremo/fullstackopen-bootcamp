export const InputButton = ({ newBlog, setNewBlog }) => {

  const handleNewBlog = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }
  return<div>
  Author: <input
      type="text"
      name='author'
      data-testid='author'
      placeholder="write author name here"
      value={newBlog.author}
      onChange={handleNewBlog}/> <br />
  Title: <input
      type="text"
      name='title'
      data-testid='title'
      placeholder="write blog title here"
      value={newBlog.title}
      onChange={handleNewBlog}/> <br />
  URL: <input
      type="text"
      name='url'
      data-testid='url'
      placeholder="write url here"
      value={newBlog.url}
      onChange={handleNewBlog}/> <br />

  </div>
}