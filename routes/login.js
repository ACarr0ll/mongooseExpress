const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const { isLoggedIn } = require('../middleware')



router.get('/login', (req, res) => {
  res.render('login/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  req.flash('success', "Logged in successfully!")
  const redirectUrl = req.session.returnTo || '/posts'
  delete req.session.returnTo
  res.redirect(redirectUrl)
})

router.get('/register', (req, res) => {
  res.render('login/register')
})

router.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body
  const user = new User({ username: username, email: email });
  if (User.find(email)) {
    console.log("already exists")
  }
  const registeredUser = await User.register(user, password)
  req.login(registeredUser, err => {
    if (err) return next(err)
    req.flash('success', "Successfully added user!")
    res.redirect('/posts')
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'User successfully logged out')
  res.redirect('/')
})

module.exports = router