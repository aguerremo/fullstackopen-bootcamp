
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'


const CreateNew = ({setNotification, addNew}) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0
    })
    navigate("/")
    setNotification(`a new anecdote ${content.props.value} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    console.log('info.value', info.props.value)
    console.log('content.value', content.props.value)
    console.log('author.value', author.props.value) 
  }

  const handleReset = () => {
    content.zero()
    author.zero()
    info.zero()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.props.value} onChange={content.props.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.props.value} onChange={author.props.onChange}/>
        </div>
        <div>
          url for more info
          <input name='info' value={info.props.value} onChange={info.props.onChange} />
        </div>
        <button>create</button>
      <button type='button' name='reset' onClick={handleReset}>reset</button>

      </form>
    </div>
  )

}

export default CreateNew