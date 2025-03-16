export const Filter = ({setShowAll}) => {

    const handleFilter = (event) =>{
        setShowAll(event.target.value.toLowerCase())
      }
      
    return (<div>
 <h2>Phonebook</h2>
 <p>filter: <input onChange={handleFilter} /></p>
    </div>
       )
}