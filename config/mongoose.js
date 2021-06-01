const { MongoClient } = require('mongodb')
const mongoose =  require('mongoose')

mongoose.connect('mongodb://localhost/conneti_development', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Error connecting to mongo db'))

db.once('open', () => {
    console.log('Connected to the database :: MongoDB')
})

module.exports = db