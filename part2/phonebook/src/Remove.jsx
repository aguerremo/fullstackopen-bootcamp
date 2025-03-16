import personService from "./services/persons"

export const Remove = ({id, setPersons, persons}) => {

    const removePerson = () => {
        if (window.confirm("¿Seguro que quieres eliminar este contacto?")) {
            personService
            .remove(id)
            .then (() => {
                setPersons(persons.filter((person) => person.id !== id))
            })
            .catch((error) => {
                console.log('Error al eliminar: ', error);
            })
        }
    }

    return <button onClick={removePerson}>delete</button>

}