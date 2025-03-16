import { InputButton } from "./InputButton";
import { addPersonHandler } from "./Utils";

export const AddPerson = ({persons ,newName, newNumber, setNewName, setPersons, setNewNumber}) => {
      
    const addPerson = (event) => {
      event.preventDefault()
      addPersonHandler({persons, setPersons, newName, newNumber, setNewName, setNewNumber});
    }
    

        

    return <div>
    <h2>add a new</h2>
    <form  onSubmit={addPerson}>
    <div>
      <InputButton newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </div>
  }