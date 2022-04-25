const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

router.get('/', (req, res) => {
  res.render('login/login')
})

router.post('/register', urlencodedParser, (req, res) => {
  console.log(req.body)
})

module.exports = router