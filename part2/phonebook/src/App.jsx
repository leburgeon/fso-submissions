import { useState } from 'react'
import PersonDisplay from './Components/PersonDisplay'
import PersonForm from './Components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'
     }
  ]) 

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm setPersons={setPersons} persons={persons}></PersonForm>
      <h2>Numbers</h2>
      <PersonDisplay persons={persons}/>
    </div>
  )
}

export default App