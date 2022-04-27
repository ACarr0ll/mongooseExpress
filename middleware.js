const Joi = require('joi')


//Login validation
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Please sign in!')
    return res.redirect('/login')
  }
  next()
}

//Joi schema


// Is valid post id validation
module.exports.isValidPost = async (req, res, next) => {
  const { id } = req.params
  if (id.length < 24 || id.length > 24) {
    req.flash('error', 'Invalid Post URL')
    return res.redirect('/posts')
  }
  const post = await Post.findById(id)
  if (!post) {
    req.flash('error', 'No post found')
    return res.redirect('/posts')
  } else {
    return next()
  }
}