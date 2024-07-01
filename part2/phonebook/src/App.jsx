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

  // Filters persons to show based on the filter input
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(
      searchValue.toLowerCase()
    )
  )

  // Handles adding a new person to the phonebook
  const addNewPerson = (event) => {
    event.preventDefault()
    // Checks if the name is already in the phone book and sends alert to the window
    if (persons.some((person) => person.name === newName)){
      window.alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPersonObject))
  }

  const handleSearch = (event) => {
    const newSearchValue = event.target.value
    setSearchValue(newSearchValue);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleSearch={handleSearch}/>
      <PersonForm
      newName={newName} 
      handleNewName={handleNewName} 
      newNumber={newNumber}
      handleNewNumber={handleNewNumber}
      addNewPerson={addNewPerson}></PersonForm>
      <h2>Numbers</h2>
      <PersonDisplay persons={personsToShow}/>
    </div>
  )
}

export default App