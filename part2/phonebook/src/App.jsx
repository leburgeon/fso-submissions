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
  const displayNotification = (message, isError = false, seconds = 5) => {
    setNotification({message, isError});
    setTimeout(() => {
      setNotification(null)
    }, seconds * 1000)
  }

  // Handles the add button press event
  const handleAdd = (event) => {
    event.preventDefault()

    const personWithSameName = persons.find(person => person.name === newName)

    console.log("After finding", personWithSameName)

    if (!personWithSameName){
      console.log("New person called", (!personWithSameName))
      addNewPerson()
    } else {
      if (window.confirm(`${newName} is already in phonebook, replace the old number with a new one?`)){
        const updatedPersonObject = {...personWithSameName, number: newNumber}
        updatePerson(updatedPersonObject)
        displayNotification(`Updated the contact number for ${newName}`, false, 3)
      } 
    }
  }

  // Function uses newName and newNumber states and adds a new contact to the phonebook
  const addNewPerson = () => {
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    personService.addPerson(newPersonObject)
      .then(addedPerson => {
        displayNotification(`Successfully added ${addedPerson.name}`, false, 3)
        setPersons(persons.concat(addedPerson))
        setNewName("");
        setNewNumber("")
      })
      .catch(({response : {data : {error}}}) => {
        if (error) {
          displayNotification(error, true, 3)
        } else {
          displayNotification("Could not add person to contacts", true)
        }
      })
  }
  
  // Takes an updated person, and updates the person to the db
  const updatePerson = (updatedPerson) => {
    personService.updatePerson(updatedPerson)
      .then(updated => {
        setPersons(persons.map(person => person.id !== updated.id ? person : updated))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        console.log(error)
        const validationErr = error.response.data.error
        if (validationErr){
          displayNotification(validationErr, true)
        } else {
          displayNotification(`Information of ${newName} has already been removed from the server, and so cannot be updated`
            ,true
            ,5
          )
        }
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
      addNewPerson={handleAdd}></PersonForm>
      <h2>Numbers</h2>
      <PersonDisplay persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App