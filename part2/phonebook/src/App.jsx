import { useState, useEffect } from 'react'
import PersonDisplay from './Components/PersonDisplay'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Effect hook for fetching phonebook data from server
  useEffect(() => {
    // Callback uses axios to send request to server
    axios.get("http://localhost:3001/persons")
    // Once the promise is fulfilled, callback added to queue
    .then(response => {
      // Data from response used to update persons
      setPersons(response.data)
    })
  },[])

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