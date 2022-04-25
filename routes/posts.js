const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('posts/index', { posts })
})

router.get('/new', (req, res) => {
  res.render('posts/new')
})

router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.render('posts/edit', { post })
})

router.post('/', async (req, res) => {
  const p = new Post(req.body)
  await p.save()
  res.redirect(`/posts/${p.id}`)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.render('posts/show', { post })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/posts/${post._id}`)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findByIdAndDelete(id)
  res.redirect('/posts')
})

module.exports = router