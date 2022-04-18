const mongoose = require('mongoose');

const connectDB = function () {
  const db = mongoose.connect('mongodb+srv://admin:e49KwBxT8CEnpOTp@formtest.celq4.mongodb.net/formMERN?retryWrites=true&w=majority',
    {
      useNewURLParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database Connected!")
    })
    .catch(err => {
      console.log("Database has failed to connect.")
      console.log(err)
    })

  return db
}

  module.exports = connectDB