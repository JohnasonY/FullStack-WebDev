const Person = ({name, number}) => <div>{name} {number}</div>

const Persons = (props) => {
    return (
      <>
        <h3>{props.header}</h3>
        <div>
          {props.personToShow.map(person =>
            <Person key={person.id} name={person.name} number={person.number} />
          )}
        </div>
      </>
    )
  }

export default Persons