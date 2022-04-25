const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('login/login')
})

router.post('/', passport.authenticate('local', { failureFlash: false, failureRedirect: '/' }), (req, res) => {
  res.redirect('/posts')
})

router.get('/register', (req, res) => {
  res.render('login/register')
})

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body
  const user = new User({ username: username, email: email });
  await user.setPassword(password);
  await user.save();
  res.redirect('/login')
})

module.exports = router