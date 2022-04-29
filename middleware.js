const Post = require('./models/post')

//Login validation
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'Please sign in!')
    return res.redirect('/login')
  }
  next()
}

// Is valid post id validation
module.exports.isValidPost = async (req, res, next) => {
  const { id } = req.params
  if (id.length < 24 || id.length > 24) {
    req.flash('error', 'Invalid Post URL')
    return res.redirect('/posts')
  }
  req.post = await Post.findById(id).populate('author')
  if (!req.post) {
    req.flash('error', 'No post found')
    return res.redirect('/posts')
  } else {
    return next()
  }
}