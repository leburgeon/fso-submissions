import { useEffect, useState } from "react"
import axios from "axios"
import countriesService from './services/Countries'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  // Piece of state to remember all the countries between renders
  // Initialised to empty array to avoid error when filter occurs
  const [allCountries, setAllCountries] = useState([])

  // Effect executes after first render, and retrieves all the countries data
  useEffect(() => {
    console.log("effect called")
    countriesService.retrieveAllCountries().then(data => setAllCountries(data))
  }, [])


  return (
    <>
      <h1>{allCountries.length}</h1>
    </>
  )
}

export default App
