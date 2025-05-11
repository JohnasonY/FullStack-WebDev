const Person = ({name, number, deletePerson}) => {
  return (
    <div>
      {name} {number} 
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = (props) => {
    return (
      <>
        <h3>{props.header}</h3>
        <div>
          {props.personToShow.map(person =>
            <Person key={person.id} name={person.name} number={person.number} deletePerson={() => props.deletePersonOf(person.id)}/>
          )}
        </div>
      </>
    )
  }

export default Persons