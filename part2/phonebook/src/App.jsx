import { useState, useEffect } from 'react'
import PersonDisplay from './Components/PersonDisplay'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  // State representing the persons in the database
  const [persons, setPersons] = useState([])
  // Controller state for the searchbar 
  const [searchValue, setSearchValue] = useState("");
  // Controller state for the newName field
  const [newName, setNewName] = useState('')
  // Controller state for the new number field
  const [newNumber, setNewNumber] = useState('')

  // Effect hook for fetching phonebook data from server
  // Executes once, after the app has rendered
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

  // Controls the search input field
  const handleSearch = (event) => {
    const newSearchValue = event.target.value
    setSearchValue(newSearchValue);
  }

  // Variable for storing the persons to display
  const personsToShow = persons.filter(person => 
    // Filters based on the state representing the seach value
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
    } else {
      // New person to add to the phonebook
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      // Uses the add person function from the services module
      // This function returns a promise that resolves to the added person object
      personService.addPerson(newPersonObject).then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName("");
        setNewNumber("")
      })
    }
  }

  // Handles deleting a person from the database
  const deletePerson = ({id, name}) => {
    if (window.confirm(`Do you really want to delete ${name} from phonebook?`)){
      personService.deletePerson(id).then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
        console.log(`successfully deleted ${name} from database`)
      }).catch(err => {
        alert(`this person already deleted from database`)
      })
    }
    
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
      <PersonDisplay persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App