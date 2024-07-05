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
    
    // For looping through the persons array and checking if the name is already in the phonebook
    console.log("Checking if name in phonebook...")
    persons.forEach(person => {
      // For checking if the name is equal to the one being added
      if (person.name === newName){
        console.log("Duplicate found!")
        if (window.confirm(`${person.name} is already in phonebook, replace the old number with a new one?`)){
          // For creating the updated person object and updating in the database
          const updatedPersonObject = {...person, number: newNumber}
          console.log("Old person:",person)
          console.log("Updated person:", updatedPersonObject)
          handlePersonUpdate(updatedPersonObject)
          return
       }
      }
    })

    console.log("Adding an entirely new entry")
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
  

  // Handles updating a person to the database
  const handlePersonUpdate = (updatedPerson) => {
    personService.updatePerson(updatedPerson).then(updated => {
      setPersons(persons.map(person => person.id !== updated.id ? person : updated))
    })
    setNewName("")
    setNewNumber("")
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