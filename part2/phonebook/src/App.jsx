import { useState } from 'react'
import PersonDisplay from './Components/PersonDisplay'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [searchValue, setSearchValue] = useState("");
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Controls the name input
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  // Controls the number input field
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(
      searchValue.toLowerCase()
    )
  )

  const handleSearch = (event) => {
    const newSearchValue = event.target.value
    setSearchValue(newSearchValue);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleSearch={handleSearch}/>
      <PersonForm setPersons={setPersons} 
      persons={persons} 
      newName={newName} 
      setNewName={setNewName} 
      handleNewName={handleNewName} 
      newNumber={newNumber}
      setNewNumber={setNewNumber}
      handleNewNumber={handleNewNumber}></PersonForm>
      <h2>Numbers</h2>
      <PersonDisplay persons={personsToShow}/>
    </div>
  )
}

export default App