const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const flash = require('connect-flash')


router.get('/', (req, res) => {
  res.render('login/login')
})

router.post('/', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  req.flash('success', "Logged in successfully!")
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
  req.flash('success', "Successfully added user!")
  res.redirect('/login')
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'User successfully logged out')
  res.redirect('/')
})
module.exports = router