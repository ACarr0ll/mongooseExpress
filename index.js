const express = require('express')
const app = express();
const session = require('express-session')
const path = require('path')
const engine = require('ejs-mate')

const connectDB = require('./config/db')

const postRoutes = require('./routes/posts')
const loginRoutes = require('./routes/login')

const methodOverride = require('method-override')

connectDB()


const sessionConfig = {
  secret: 'temporarysecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}


app.use(session(sessionConfig));
app.use(methodOverride('_method'))

app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(express.static(__dirname + '/public'));

app.use('/posts', postRoutes)
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
  res.render('home/home')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port 3000")
})
