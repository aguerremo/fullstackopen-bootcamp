const AddPerson = (props) => {
  const {name, number, personService} = props

const handlePersonSubmit = (event) => {
  event.preventDefault()
  personService.create({ name: name.value, number: number.value})
}

return <div>
  <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
  </div>
}

export default AddPerson