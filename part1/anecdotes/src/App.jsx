import { useState } from 'react'

import './App.css'


const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]


const getRandom = () => {
  return Math.floor(Math.random()*anecdotes.length); //Devuelve un índice
}


const App = () => {

  const [selected, setSelected] = useState(getRandom); //Guardamos el índice  
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));  //Inicializamos los votos



  const handleClickAnecdote = () =>{
    setSelected(getRandom());//Cambia el índice de la anécdota a mostrar
  };

  const handleClickVote = () =>{
    const prevVotes=[...votes]; //Clonamos el array de votes
    prevVotes[selected] +=1; //Sumamos 1 al voto de la anécodta actual
    setVote(prevVotes); //Actualizamos el estado con los nuevos votos

  };

  const topVoted = Math.max(...votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(topVoted)]}</p>
    </div>
  )
}

export default App