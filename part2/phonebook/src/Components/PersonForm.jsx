import { useState } from "react"

const PersonForm = ({ newName, newNumber, handleNewName, handleNewNumber, addNewPerson}) => {

  return(
    <>
    <h2>Add a new contact:</h2>
    <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
  )
}

export default PersonForm