const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')

//env variables
require('dotenv-defaults').config()

//app definition
const app = express()

// importing routes
const ingRoutes = require('./routes/ing')
const { Console } = require('console')

// settings
app.set('port', process.env.PORT)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'))
} else {
  app.use(morgan('dev'))
}

app.use(
  myConnection(
    mysql,
    {
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASS,
      port: 3306,
      database: process.env.DB,
    },
    'pool'
  )
)
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', ingRoutes)

// static files options

let optionstatic = {
  dotfiles: 'ignore', //allow, deny, ignore
  etag: true,
  extensions: ['htm', 'html'],
  index: false, //to disable directory indexing
  maxAge: '7d',
  redirect: false,
};

// static files

app.use(express.static(path.join(__dirname, 'public')))

// starting the server
app.listen(app.get('port'), () => {})
