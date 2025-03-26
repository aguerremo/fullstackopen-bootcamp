//npm install express
//npm install nodemon -D
//npm install morgan
//npm install mongodb
//npm install mongoose

//env
require('dotenv').config()

//Mongoose
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

//Create the mongoose Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
    }}
)

//Create the Objet Person with mongoose model
const Person = mongoose.model('Person', personSchema)

//Express facilitates server-side development
const express = require('express')
const app = express()
const morgan = require('morgan')

//Middleware that show the static content of "dist"
app.use(express.static('dist')) 
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//Allow request from all origins
const cors = require('cors') 
app.use(cors())

let persons =[]

// GET INFO
app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
        const requestDate = new Date()
        response.send('<p>Phonebook has info for ' + count +' people</p>'+ requestDate) 
    })

})

// GET PERSONS
app.get('/api/persons', (request, response) => {
    Person.find({})
  .then(persons => {
    response.json(persons)  
    })
})  

// GET PERSONS BY ID
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })  
})

// DELETE PERSONS
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)

    response.status(204).end()
})  

// POST PERSONS
app.post('/api/persons/', (request, response) => {
    const person = request.body
    

    const personExist = persons.find(p => p.name === person.name)
    const numberExist = persons.find(p => p.number === person.number)

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })

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
     
        console.log(JSON.stringify(newPerson))
        
})

// REQUEST NOT FOUND
app.use((request, response) => {
    response.status(400).json({
        error: "Not found"
    })
})

// PORT CONNECTION
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
