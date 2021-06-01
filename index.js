const express = require('express')
const app = express()
const port = 8000
const expressLayouts = require('express-ejs-layouts') 

app.use(expressLayouts)

// routes
app.use('/', require('./routes'))

// view engine setup
app.set('view engine', 'ejs')
app.set('views', './views')


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server ${err}`)
    } else {
        console.log('Development Server is up and running on port ', port)
    }
})