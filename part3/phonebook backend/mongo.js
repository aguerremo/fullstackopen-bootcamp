const mongoose = require('mongoose')

//Create the mongoose Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

//Create the Objet Person with mongoose model
const Person = mongoose.model('Person', personSchema)

//Terminal elements process.argv
const name = process.argv[3]
const number = process.argv[4]
const password = process.argv[2]

if (process.argv.length > 5) {
  console.log("The name must be between quotation marks.")
  process.exit(1) }

  else if (process.argv.length<3) {
    console.log('give the correct arguments. E.g.: node mongo.js "yourpassword" Alex 612341234')
    process.exit(1)
  }

  else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} 
  else if (process.argv.length === 3){
  console.log("phonebook:");
  Person.find({})
  .then(result => {
    result.forEach(person => {
      console.log(person.name,person.number)
    })
    mongoose.connection.close()
  })
} 


const url =
  `mongodb+srv://aguerremo:${password}@cluster0.vnici.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

