import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (e) {
        console.error(`error fetching resources from ${baseUrl}`, e)
      }
    }
    fetchResources()
  }, [])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
    } catch (e) {
      console.error(`error adding ${resource}`, e)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const {reset: resetContent, ...content} = useField('text')
  const {reset: resetName, ...name}  = useField('text')
  const {reset: resetNumber, ...number} = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    try {
      await noteService.create({ content: content.value })
      resetContent()
    } catch (e) {
      console.error('could not sub note')
    }
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    try{
      await personService.create({ name: name.value, number: number.value})
      resetName()
      resetNumber()
    } catch (e) {
      console.log('could not sub human')
    }
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App