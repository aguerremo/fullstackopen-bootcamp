export const InputButton = () => {
  const handleNewBlog = (event) => {
    return (
      <div>
        Author:{' '}
        <input
          type="text"
          name="author"
          data-testid="author"
          placeholder="write author name here"
          value={event.author}
          onChange={handleNewBlog}
        />{' '}
        <br />
        Title:{' '}
        <input
          type="text"
          name="title"
          data-testid="title"
          placeholder="write blog title here"
          value={event.title}
          onChange={handleNewBlog}
        />{' '}
        <br />
        URL:{' '}
        <input
          type="text"
          name="url"
          data-testid="url"
          placeholder="write url here"
          value={event.url}
          onChange={handleNewBlog}
        />{' '}
        <br />
      </div>
    )
  }
}
