import { InputButton } from "./InputButton";
import { addPersonHandler } from "./Utils";
import { Notifications } from "./Notification";

export const AddPerson = ({persons ,newName, newNumber, setNewName, setPersons, setNewNumber, setDoneMessage,setErrorMessage ,doneMessage, errorMessage}) => {
      
    const addPerson = (event) => {
      event.preventDefault()
      addPersonHandler({persons, setPersons, newName, newNumber, setNewName, setNewNumber, setDoneMessage ,setErrorMessage});
    }
    
   
        

    return <div>
    <h2>add a new</h2>
    <form  onSubmit={addPerson}>
      <Notifications message={doneMessage} errorMessage={errorMessage} />
    <div>
      <InputButton newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </div>
  }