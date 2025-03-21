import { useState, useEffect } from 'react'
import { Person } from './Person'
import { AddPerson } from './AddPerson'
import { Filter } from './Filter'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [doneMessage, setDoneMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)




console.log('render', persons.length, 'persons');

  const personToShow = showAll
  ? persons.filter(persons => 
      persons.name.toLowerCase().includes(showAll) || 
      persons.number.includes(showAll)
    )
  : persons;

  const hook = () => {
    console.log('effect')
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  return (
    <div>
      <Filter setShowAll={setShowAll}/>
            
      <AddPerson errorMessage={errorMessage} setErrorMessage={setErrorMessage} doneMessage={doneMessage} setDoneMessage={setDoneMessage} persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} setPersons={setPersons} setNewNumber={setNewNumber}/>
      
      <Person personToShow={personToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App