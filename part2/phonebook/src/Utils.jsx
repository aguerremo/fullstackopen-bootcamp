import personService from "./services/persons"


export const addPersonHandler = ({persons ,newName, newNumber, setNewName, setPersons, setNewNumber}) =>{

    const existingPerson = persons.find(person => person.name ===newName)
    const existingNumber = persons.find(person => person.number ===newNumber)

    if (existingPerson) {
        if (window.confirm(newName + ' ya está en la agenda')) {
          const updatedPerson = {...existingPerson, number: newNumber}

          personService.update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => 
              person.id === existingPerson.id ? response.data : person
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('Error al actualizar el contacto', error);
            
          })
        }
        
      } else if 
      (existingNumber) {
        if (window.confirm('El número ' + newNumber + ' ya está asociado a otro contacto. ¿Desea actualizar el nombre del contacto?')) {
          const updatedPerson = {...existingNumber, name: newName}

          personService.update(existingNumber.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => 
              person.id === existingNumber.id ? response.data : person
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('Error al actualizar el contacto', error);
            
          })
        }
    } else {

      const newPerson = {name: newName, number: newNumber, id: (persons.length + 1).toString()}
      personService.create(newPerson)
        .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        })
      
      }
    }

    



      