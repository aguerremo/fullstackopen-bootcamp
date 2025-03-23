import personService from "./services/persons"


export const addPersonHandler = ({persons ,newName, newNumber, setNewName, setPersons, setNewNumber, setDoneMessage, setErrorMessage}) =>{

    const existingPerson = persons.find(person => person.name ===newName)
    const existingNumber = persons.find(person => person.number ===newNumber)

    const removeDoneNotification = () => {
      setTimeout(() => {
        setDoneMessage(null) 
      }, 3000);
    }

    const removeErrorNotification = () => {
      setTimeout(() => {
        setErrorMessage(null) 
      }, 3000);
    }

    if (existingPerson) {
        if (window.confirm(newName + ' ya está en la agenda, ¿Desea actualizar el número de ' + newName)) {
          const updatedPerson = {...existingPerson, number: newNumber}

          personService.update(existingPerson.id, updatedPerson)
          .then(response => {
            console.log('succes!');
            setPersons(persons.map(person => 
              person.id === existingPerson.id ? response.data : person
            ))
            
            setNewName('')
            setNewNumber('')
            setDoneMessage('Número de teléfono actualizado con éxito.') 
            removeDoneNotification()
          })
          .catch(error => {
            console.log('fail', error);
            setErrorMessage('La información del contacto ' + newName + ' ha sido eliminada del servidor.' )
            removeErrorNotification()
          })
         
        }
        
      } else if 
      (existingNumber) {
        if (window.confirm('El número ' + newNumber + ' ya está asociado a otro contacto. ¿Desea actualizar el nombre del contacto?')) {
          const updatedPerson = {...existingNumber, name: newName}

          personService.update(existingNumber.id, updatedPerson)
          .then(response => {
            console.log('succes!');
            setPersons(persons.map(person => 
              person.id === existingNumber.id ? response.data : person
            ))
            setNewName('')
            setNewNumber('')
            setDoneMessage('Nombre actualizado con éxito.') 
            removeDoneNotification()
          })
          .catch(error => {
            console.log('fail', error);
            setErrorMessage('La información del contacto ' + newNumber + ' ha sido eliminada del servidor.' )
            removeErrorNotification()
          })
        }
    } else {

      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson)
        .then(response => {
          console.log('succes!');
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setDoneMessage('Contacto creado con éxito') 
        removeDoneNotification()

        })
      
      }}