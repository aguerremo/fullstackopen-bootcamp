//npm install express
//npm install nodemon -D


//Express facilitates server-side development
const express = require('express')
const app = express()

app.use(express.static('dist')) 
app.use(express.json())


//Allow request from all origins
const cors = require('cors') 
app.use(cors())

//Middleware that show the static content of "dist"

//Import the module logger from ./modules/logger 
const logger = require('./modules/logger')
app.use(logger)


let persons =[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramoov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
  


app.get('/info', (request, response) => {
    const numberOfPersons = persons.length
    const requestDate = new Date()

    response.send('<p>Phonebook has info for '+ numberOfPersons +' people</p>'+ requestDate) 
})


app.get('/api/persons', (request, response) => {
    
    response.json(persons)
})  

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id ===id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)

    response.status(204).end()
})  

app.post('/api/persons/', (request, response) => {
    const person = request.body
    const newId = Math.floor(Math.random() * 1000)

    const personExist = persons.find(p => p.name === person.name)
    const numberExist = persons.find(p => p.number === person.number)

    const newPerson = {
        id: newId,
        name: person.name,
        number: person.number

    }
    if (personExist || numberExist){
        return response.status(400).json({
            error: 'name or number must be unique'
        })

    } else if (newPerson.name === undefined || newPerson.number===undefined){ 
        return response.status(400).json({
            error: 'name or number must be defined'
        })
   
    } else {
        persons = [...persons, newPerson]
        response.json(newPerson)
    }
})

app.use((request, response) => {
    response.status(400).json({
        error: "Not found"
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
