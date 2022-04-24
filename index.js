const express = require('express')
const app = express();
const path = require('path')
const engine = require('ejs-mate')
const connectDB = require('./config/db')
const Post = require('./models/post')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
connectDB()

app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('posts/home')
})

app.get('/posts', async (req, res) => {
  const posts = await Post.find({})
  res.render('posts/index', { posts })
})

app.get('/posts/new', (req, res) => {
  res.render('posts/new')
})

app.get('/posts/login', (req, res) => {
  res.render('posts/login')
})

app.get('/post/:id/edit', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.render('posts/edit', { post })
})

app.post('/posts', async (req, res) => {
  const p = new Post(req.body)
  await p.save()
  res.redirect(`/post/${p.id}`)
})

app.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.render('posts/show', { post })
})

app.put('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/post/${post._id}`)
})

app.delete('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findByIdAndDelete(id)
  res.redirect('/posts')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port 3000")
})
