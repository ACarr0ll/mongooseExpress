const mongoose = require('mongoose')
const passport = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})

UserSchema.plugin(passport)

const User = mongoose.model('User', UserSchema)

module.exports = User