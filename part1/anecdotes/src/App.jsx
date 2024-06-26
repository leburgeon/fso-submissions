import { useState } from 'react'

const MostVotesDisplay = ({ votes, anecdotes }) => {
  let highestVotes = votes[0]
  for (let i = 1; i < votes.length; i++){
    if (votes[i] > highestVotes){
      highestVotes = votes[i];
    }
  }
  if (!highestVotes){
    return (
      <h1>Please vote for your favorite!</h1>
    )
  }
  return (
    <>
      <h1>Anecdote with the most votes:</h1>
      <p>{anecdotes[votes.indexOf(highestVotes)]}</p>
      <p>{highestVotes} {highestVotes > 1 ? "votes" : "vote"}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])

  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handleVote = () => {
    const updated = [...votes];
    updated[selected] = updated[selected] ? updated[selected] + 1 : 1;
    setVotes(updated);
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandom}>next anecdote</button>
      <MostVotesDisplay votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App