import { Remove } from "./Remove";

export const Person = ({ personToShow, setPersons }) => (
  <div>
    <h2>Numbers</h2>
    {personToShow.map((person) => (
      <div key={person.id}>
        {person.name} - {person.number} {
     <Remove id={person.id} setPersons={setPersons} persons={personToShow}/>}

      </div>

    ))}
  </div>
);