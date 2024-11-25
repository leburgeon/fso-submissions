import React, { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

const useNotes = url => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    }).catch(e => console.error(e))
  }, [url])
  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const url = 'https://notes2023.fly.dev/api/notes'

  const notes = useNotes(url)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      Hello Webpck Server! {counter} Clicks!
      <button onClick={handleClick}>press</button>
      there are {notes.length} notes available!
    </div>
  )
}

export default App