import React from 'react'
import axios from 'axios'

// A class component for a react component
class App extends React.Component {

  // 
  constructor(props) {
    super(props)

    // Sets the 'state' field for the created component object
    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  // Lifecycle method for performing an action after the component mounted
  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(response => {
      this.setState({anecdotes: response.data})
    })
  }

  // For changing only the 'current' property of the state object to a random new key
  handleClick = () => {
    const current = Math.floor(Math.random() * this.state.anecdotes.length)
    this.setState({current})
  }

  // Only required method for a React.Component
  // Determines what is displayed on screen
  render() {
    if (this.state.anecdotes.length === 0) {
      return <div>no anecdotes...</div>
    }

    return (
      <div>
        <h1>anecdote of the day</h1>
        <div>{this.state.anecdotes[this.state.current].content}</div>
        <button onClick={this.handleClick}>next</button>
      </div>
    )
  }
}

export default App
