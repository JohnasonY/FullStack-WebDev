import { useState } from 'react'

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const DisplayAnecdote = ({header, body}) => {
  return (
    <>
      <h1>{header}</h1>
      <div>
        {body}
      </div>
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
   
  const length = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(length).fill(0))
  const [maxVoteIndex, setMaxVoteIndex] = useState(0)

  const clickNext = () => {
    const RandomIndex = getRandomIntInclusive(0, length - 1)
    setSelected(RandomIndex)
  }

  const clickVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVote(updatedVotes)
    if (updatedVotes[selected] > updatedVotes[maxVoteIndex])
      setMaxVoteIndex(selected)
  }

  return (
    <div>
      <DisplayAnecdote header={"Anecdote of the day"} body={anecdotes[selected]}/>
      <Button text={"vote"} onClick={clickVote}/>
      <Button text={"next anecdote"} onClick={clickNext}/>
      <div>
        has {votes[selected]} votes
      </div>

      <DisplayAnecdote header={"Anecdote with most votes"} body={anecdotes[maxVoteIndex]} />
      <div>
        has {votes[maxVoteIndex]} votes
      </div>
    </div>
  )
}

export default App