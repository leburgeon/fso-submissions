import { useState, useEffect } from 'react'
import PersonDisplay from './Components/PersonDisplay'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import axios from 'axios'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
  // State representing the persons in the database
  const [persons, setPersons] = useState([])
  // Controller state for the searchbar 
  const [searchValue, setSearchValue] = useState("");
  // Controller state for the newName field
  const [newName, setNewName] = useState('')
  // Controller state for the new number field
  const [newNumber, setNewNumber] = useState('')
  // State for notification message
  const [notification, setNotification] = useState(null)

  // Effect hook for fetching phonebook data from server
  // Executes once, after the app has rendered
  useEffect(() => {
    // Callback uses axios to send request to server
    personService.getAll()
    // Once the promise is fulfilled, callback added to queue
    .then(data => {
      // Data from response used to update persons
      setPersons(data)
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

  // Displays a message for a number of seconds, takes an isError boolean, which changes the inline style
  const displayNotification = (message, isError, seconds) => {
    setNotification({message, isError});
    setTimeout(() => {
      setNotification(null)
    }, seconds * 1000)
  }

  // Handles adding a new person to the phonebook
  const addNewPerson = (event) => {
    event.preventDefault()
    // For looping through the persons array and checking if the name is already in the phonebook
    // Sets the updatedAPerson flag to true if name already in phonebook
    const updatedAPerson = persons.some(person => {
      // For checking if the name is equal to the one being added
      if (person.name === newName){
        if (window.confirm(`${person.name} is already in phonebook, replace the old number with a new one?`)){
          // For creating the updated person object and updating in the database
          const updatedPersonObject = {...person, number: newNumber}
          handlePersonUpdate(updatedPersonObject)
          displayNotification(`Updated the contact number for ${person.name}`, false, 3)
          return true
        } 
      }
      return false
    })

    // If the name is not already in the phonebook, adds a new person to the database
    if (!updatedAPerson){
    // New person to add to the phonebook
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    // Uses the add person function from the services module
    // This function returns a promise that resolves to the added person object
    personService.addPerson(newPersonObject).then(addedPerson => {
      displayNotification(`Successfully added ${addedPerson.name}`, false, 3)
      setPersons(persons.concat(addedPerson))
      setNewName("");
      setNewNumber("")
    })
    }
  }

  // Handles updating a person to the database
  const handlePersonUpdate = (updatedPerson) => {
    personService.updatePerson(updatedPerson).then(updated => {
      setPersons(persons.map(person => person.id !== updated.id ? person : updated))
      setNewName("")
      setNewNumber("")
    }).catch(error => {
      displayNotification(`Information of ${newName} has already been removed from the server, and so cannot be updated`
        ,true
        ,5
      )
      setPersons(persons.filter(person => person.id !== updatedPerson.id))
    })
  }

  // Handles deleting a person from the database
  const deletePerson = ({id, name}) => {
    if (window.confirm(`Do you really want to delete ${name} from phonebook?`)){
      personService.deletePerson(id).then(deletedPerson => {
        displayNotification(`${name} successfully deleted from the database`
          ,false
          ,3
        )
        setPersons(persons.filter(person => person.id !== id))
      }).catch(err => {
        displayNotification(`${name} is already deleted from the database`, true, 4)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
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