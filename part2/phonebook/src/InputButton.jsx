export const InputButton = ({setNewName, setNewNumber, newName, newNumber}) => {

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value)
      }
    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(String(event.target.value))
       
      }
    return<div>
    name: <input value={newName} onChange={handleNameChange}/> <br />
    number: <input value={newNumber} onChange={handleNumberChange}/>
 </div>
  }