import { Fragment, use, useState } from 'react'



const Statistics = ({counters}) => {
  if (counters.bad + counters.neutral + counters.good === 0) {
    return <p>no feedback given</p>}
  return <table>
    <tbody>
      <tr>
        <td>good: </td>
        <td>{counters.good}</td>
      </tr>
      <tr>
        <td>neutral: </td>
        <td>{counters.neutral}</td>
      </tr>
      <tr>
        <td>bad: </td>
        <td>{counters.bad}</td>
      </tr>
      <tr>
        <td>all: </td>
        <td><TotalCounter counters={counters}/></td>
      </tr>
      <tr>
        <td>average: </td>
        <td><Average counters={counters}/></td>
      </tr>
      <tr>
        <td>positive: </td>
        <td><Positive counters={counters}/> %</td>
      </tr>
    </tbody>
    </table>
}

const TotalCounter = ({counters}) => {
  const totalValue = counters.good + counters.bad + counters.neutral
  return totalValue
}

const Average = ({counters}) => {
  const totalValue = counters.bad + counters.good + counters.neutral
  if (totalValue === 0) return 0;
  return (counters.good - counters.bad)/totalValue;
}

const Positive = ({counters}) => {
  const totalValue = counters.bad + counters.good + counters.neutral
  if (totalValue === 0) return 0;
  return (counters.good/totalValue)*100;
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  // const [good, good] = useState(0)
  // const [neutral, neutral] = useState(0)
  // const [bad, bad] = useState(0)

  const [counters, setCounters] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const [clicks, setClicks] = useState([]); // ----> Array para los clicks totales (sigue en linea 25)

  const handleClickGood = () =>{
    const newCountersState = {
        ...counters, // -------> Spred operator, hace que todas las propiedades del objeto se esparzan 
        good: counters.good + 1,
        neutral: counters.neutral,
        bad: counters.bad,
      }

      setCounters(newCountersState)
      setClicks((prevClicks)=>[...prevClicks,'Good']) //
  }
  const handleClickNeutral = () =>{
    setCounters({
      ...counters,
      good: counters.good,
      neutral: counters.neutral + 1,
      bad: counters.bad,
    })
    setClicks((prevClicks)=>[...prevClicks,'Neutral']) //Actualizamos el prevClicks, devolvemos un nuevo array. => es igual que un return[..prevClicks(Me haces un spred de todos los elementos que tenga el prevClicks),'Neutral' (me añades el elemento Neutral.)]
  }
  const handleClickBad = () =>{
    setCounters({
      ...counters,
      good: counters.good,
      neutral: counters.neutral,
      bad: counters.bad + 1,
    })
    setClicks((prevClicks)=>[...prevClicks,'Bad'])

  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
    
      <h1>statistics</h1>
      <Statistics counters={counters}/>
    </div>
  )
}

export default App