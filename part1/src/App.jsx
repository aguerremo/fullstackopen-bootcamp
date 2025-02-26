import './App.css'
import Mensaje from './Mensaje.jsx'

const Description = () => {
    return <p>Esto es un poryecto de React</p>
}
function App() {

  return (
    <>
      <Mensaje color="blue" message="Esto es un"/>
      <Mensaje color="yellow" message="curso de"/>
      <Mensaje color="red" message="React"/>
      <Description/>

    </>
  )
}

export default App
