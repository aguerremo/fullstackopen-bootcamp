//http://localhost:5174/

import Header from "./Header"
import Content from "./Content"
import Part from "./Part"
import Total from "./Total"


const App = () => {
  const course = { 
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name:'State of a component',
        exercises: 14
      } 
    ]
  }

  const total = course.parts.reduce((sum,part) => sum + part.exercises,0)

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total total={total} />
    </div>
  )
}

export default App