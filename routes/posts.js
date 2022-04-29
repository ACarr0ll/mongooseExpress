const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const flash = require('connect-flash')
const ExpressError = require('../utils/ExpressError')
const { isLoggedIn, isValidPost } = require('../middleware')
const passport = require('passport')


router.get('/', async (req, res, next) => {
  const posts = await Post.find({}).populate('author')
  res.render('posts/index', { posts })
})

router.get('/new', isLoggedIn, (req, res) => {
  res.render('posts/new')
})

router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.render('posts/edit', { post })
})

router.post('/', isLoggedIn, async (req, res, next) => {
  const p = new Post(req.body)
  p.author = req.user._id
  await p.save()
  res.redirect(`/posts/${p.id}`)
})

router.get('/:id', isValidPost, async (req, res, next) => {
  const post = req.post
  res.render('posts/show', { post })
})

router.put('/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params
  const post = await Post.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/posts/${post._id}`)
})

router.delete('/:id', isLoggedIn, async (req, res, nexr) => {
  const { id } = req.params
  const post = await Post.findByIdAndDelete(id)
  res.redirect('/posts')
})

router.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).send(message)
})

module.exports = router