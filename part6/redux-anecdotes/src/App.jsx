import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'

import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

import Notification from './components/Notification'
import { useEffect } from 'react'

import { initialiseAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(initialiseAnecdotes())
    //anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  },[])

  return (
    <div>
      <Notification/>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App