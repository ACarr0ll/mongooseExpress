const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

router.get('/', (req, res) => {
  // const { user } = await DefaultUser.authenticate()('user', 'password');
  res.render('login/login')
})

router.post('/', urlencodedParser, async (req, res) => {
  const { username, password } = req.body
  const user = await User.authenticate(username, password);
  res.send("SUCCESS")
})

router.get('/register', (req, res) => {
  res.render('login/register')
})

router.post('/register', urlencodedParser, async (req, res) => {
  const { username, password, email } = req.body
  const user = new User({ username: username, email: email });
  await user.setPassword(password);
  await user.save();
  res.redirect('/login')
})

module.exports = router