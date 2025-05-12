const AddNote = (props) => {
  const {content, noteService} = props

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  return <div>
    <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
  </div>
}

export default AddNote