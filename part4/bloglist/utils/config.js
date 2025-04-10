require('dotenv').config()

const PORT = process.env.PORT

// const MONGO_DB_URI = process.env.NODE_ENV === 'test' 
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI

const MONGO_DB_URI = process.env.TEST_MONGODB_URI

module.exports = {
  MONGO_DB_URI,
  PORT
}