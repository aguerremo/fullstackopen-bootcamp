import { useField, useResource } from "./hooks/index"
import AddNote from "./components/notes/AddNote"
import AddPerson from "./components/persons/AddPerson"


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')


  return (
    <div>
      <h2>notes</h2>
      <AddNote content={content} noteService={noteService}/>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <AddPerson name={name} number={number} personService={personService}/>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App