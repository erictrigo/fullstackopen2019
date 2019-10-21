import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayAnecdote = ({ anecdote, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      {anecdote}
    </div>
  )
}

const DisplayVotes = ({ votes }) => <div>has {votes} votes</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const generateAnecdote = () => {
    const generateRandomInt = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }

    setSelected(generateRandomInt(0, anecdotes.length))
  }

  const voteForAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1

    setVotes(copy)

    if (Math.max(...copy) === copy[selected]) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <DisplayAnecdote
        anecdote={anecdotes[selected]}
        title="Anecdote of the day"
      />
      <DisplayVotes votes={votes[selected]} />
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={generateAnecdote} text="next anecdote" />
      <DisplayAnecdote
        anecdote={anecdotes[mostVoted]}
        title="Anecdote with most votes"
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
