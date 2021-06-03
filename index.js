const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000
const dotenv = require('dotenv')
const expressLayouts = require('express-ejs-layouts') 
const db = require('./config/mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')


dotenv.config()

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(express.static('./assets'))

app.use(expressLayouts)
// extract styles & scripts from sub pages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)


// view engine setup
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(session({
    name: 'connecti',
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000  * 600 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/conneti_development',
            mongooseConnection: db,
            autoRemove: 'disabled',

        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)


// routes
app.use('/', require('./routes'))


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server ${err}`)
    } else {
        console.log('Development Server is up and running on port ', port)
    }
})