import { useState } from 'react'
import Persons from './Components/Persons'
import SearchFilter from './Components/SearchFilter'
import PersonForm from './Components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [personToShow, setpersonToShow] = useState(persons)


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => [
    setNewNumber(event.target.value)
  ]

  const handleFilterChange = (event) => {
    const input = event.target.value
    setFilter(input)

    if (input === "")
      setpersonToShow(persons)
    else {
      setpersonToShow(persons.filter(person =>
        person.name.toLowerCase().includes(input.toLowerCase())
      ))
    }
  }


  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    const numberExists = persons.some(person => person.number === newNumber)
    // if the name not exists, add new person
    if (nameExists)
      alert(`Name: ${newName} is already added to phonebook`)
    else if(numberExists)
      alert(`Number: ${newNumber} is already added to phonebook`)
    else
    {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(personObject))
      setpersonToShow(personToShow.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>PhoneBooks</h2>

      <SearchFilter header="Filter" text="filter show with" value={filter} onChange={handleFilterChange} />

      <PersonForm header="Add a new" 
                  onSubmit={addPerson}
                  newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      
      <Persons header="Numbers" personToShow={personToShow} />
    </div>
  )
}

export default App