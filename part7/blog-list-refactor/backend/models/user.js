const mongoose = require('mongoose')

// Defines the schema for a new collection of users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true
  },
  // This outlines an array of mongo object ids, with a reference to the 'blog' model for later populating
  blogs : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

// Sets the toJSON method of the documents created with the resulting model
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('User', userSchema)