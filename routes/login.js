const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local');
const passport = require('passport')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', (req, res) => {
  res.render('login/login')
})

router.post('/', passport.authenticate('local', { failureFlash: false, failureRedirect: '/' }), (req, res) => {
  res.redirect('/')
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