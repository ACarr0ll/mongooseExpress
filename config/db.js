const mongoose = require('mongoose');

const connectDB = function () {
  const db = mongoose.connect(process.env.ATLAS_URI,
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