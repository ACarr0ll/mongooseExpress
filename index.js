//Setup express add and pull in dotenv
const express = require('express')
const app = express();
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
const flash = require('connect-flash')
// app.use(bodyParser.json());

const ExpressError = require('./utils/ExpressError')

//Setup cookie using sessionConfig
app.use(session({
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(flash())

//Import Database connection and connect
const connectDB = require('./config/db')
connectDB()

//import routes
const postRoutes = require('./routes/posts')
const loginRoutes = require('./routes/login')
const User = require('./models/user')

//Method override for HTTP form methods such as PUT
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//Setup Passport 
const LocalStrategy = require('passport-local');
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set view engine to EJS and create views directory
const path = require('path')
const engine = require('ejs-mate')

app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Setup static images, css and static items
app.use(express.static(path.join(__dirname + '/public')));

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currentUser = req.user
  next()
})
//Set the app to use post routes and login routes
app.use('/posts', postRoutes)
app.use('/', loginRoutes)

//Setup the home page
app.get('/', (req, res) => {
  res.render('home/home')
})

//Listen for request on port determined by Heroku
app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port 3000")
})