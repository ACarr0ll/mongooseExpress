const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const postSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post