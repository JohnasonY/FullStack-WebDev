import { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import SearchFilter from './Components/SearchFilter'
import PersonForm from './Components/PersonForm'
import PersonService from './Services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [personToShow, setpersonToShow] = useState([])

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
        setpersonToShow(initialNumbers)
      })
  }, [])

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

    const person = persons.find(person => person.name === newName)
    const numberExists = persons.find(person => person.number === newNumber)
    // if the name not exists, add new person
    if (person){
      if (confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
        const newPerson = {...person, number: newNumber}

        PersonService
          .updateNumber(person.id, newPerson)
          .then(returnedPerson => {
            setpersonToShow(personToShow.map(curPerson => curPerson.id === person.id ? returnedPerson : curPerson))
            setPersons(persons.map(curPerson => curPerson.id === person.id ? returnedPerson : curPerson))
            setNewName("")
            setNewNumber("")
          })
      }
    }
    else if(numberExists)
      alert(`Number: ${newNumber} is already added to phonebook`)
    else
    {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      PersonService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setpersonToShow(personToShow.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const deletePersonOf = id => {
    const person = persons.find(p => p.id === id)
    const name = person.name
    if (window.confirm(`Delete ${name}?`))
    {
      PersonService
        .deletePerson(id)
        .then(returnedPerson => {
          setpersonToShow(personToShow.filter(p => p.id !== returnedPerson.id))
          setPersons(persons.filter(p => p.id !== returnedPerson.id))
        })
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
      
      <Persons header="Numbers" personToShow={personToShow} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App