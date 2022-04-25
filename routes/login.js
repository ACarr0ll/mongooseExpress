const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('login/login')
})

router.post('/register', (req, res) => {
  res.send(req.body)
})

module.exports = router