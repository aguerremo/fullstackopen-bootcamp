//npm install express
//npm install nodemon -D
//npm install morgan
//npm install mongodb
//npm install mongoose
//npm install dotenv

//env
require('dotenv').config()

//Mongoose
const Person = require('./models/models')

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

// GET INFO ---
app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
        const requestDate = new Date()
        response.send('<p>Phonebook has info for ' + count +' people</p>'+ requestDate) 
    })

})

// GET PERSONS ---
app.get('/api/persons', (request, response) => {
    Person.find({})
  .then(persons => {
    response.json(persons)  
    })
})  

// GET PERSONS BY ID ---
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })  
})

// DELETE PERSONS ---
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.deleteOne({_id:id})
    .then(result => {
        response.status(204).end()
    })
})  

// POST PERSONS ---
app.post('/api/persons', (request, response) => {
    const person = request.body 

    if (!person.name || !person.number){
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    } 

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })

    newPerson.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
        console.log(JSON.stringify(newPerson))
    })


// REQUEST NOT FOUND 
app.use((request, response) => {
    response.status(400).json({
        error: "Not found"
    })
})

app.use((error, request, response, next) => {
     console.log(error)
     console.log(error.name)
     response.status(400).end()
})

// PORT CONNECTION ---
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
