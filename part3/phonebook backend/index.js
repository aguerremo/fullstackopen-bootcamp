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
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const requestDate = new Date()
      response.send('<p>Phonebook has info for ' + count +' people</p>'+ requestDate)
    }).catch(error => next(error))
})

// GET PERSONS ---
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    }).catch(error => next(error))
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
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.deleteOne({ _id:id })
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
})

// PUT PERSON
app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body //Add the request content to person
  console.log('Persona creada', person)

  Person.findOne({ name: person.name }) //Find a person with the same name
    .then(existingNamePerson => { //Add this person to existingPerson
      console.log('Persona encontrada', existingNamePerson)

      Person.findOne({ number: person.number }) //Find a person with the same name
        .then(existingNumberPerson => { //Add this person to existingPerson
          console.log('Persona encontrada', existingNumberPerson)

          if (existingNamePerson) { //If existingPerson = true
            Person.findOneAndUpdate( //Find Person with
              { name: person.name }, //{filter} same name like person.name
              { number: person.number }, //{update} the number with the person.number
              { new: true, runValidators:true, context:'query' } //{return the new value}
            ).then(updatedPersonName => {
              console.log('Persona actualizada', updatedPersonName)
              response.json(updatedPersonName)
            }).catch(error => next(error))
          }
          else if (existingNumberPerson) {
            Person.findOneAndUpdate(
              { number: person.number },
              { name: person.name },
              { new: true, runValidators:true, context:'query' }
            ).then(updatedPersonNumber => {
              console.log('Persona actualizada', updatedPersonNumber)
              response.json(updatedPersonNumber)
            }).catch(error => next(error))
          } else {
            response.status(404).json({ error:'Persona no encontrada' })
          }
        }).catch(error => next(error))
    } )

})

// POST PERSONS ---
app.post('/api/persons', (request, response, next) => {
  const person = request.body

  if (!person.name === undefined || person.number === undefined){
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
    }).catch(error => next(error))
  console.log(JSON.stringify(newPerson))
})



// REQUEST NOT FOUND ---
app.use((request, response) => {
  response.status(400).json({
    error: 'Not found'
  })
})

app.use((error, request, response) => {
  console.log(error)
  console.log(error.name)
  if(error.name === 'CastError'){
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    response.status(400).json({ error: error.message })
  }
})

// PORT CONNECTION ---
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
