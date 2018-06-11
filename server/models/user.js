const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{ VALUE } is not a valid email'
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

// return a trimmed version of the document
UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

// .methods : instance method
UserSchema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt.sign(
                {
                  _id: user._id.toHexString(), 
                  access
                },
                'abc123')

  user.tokens = user.tokens.concat([{ access, token }])

  return user.save().then(() => {
    return token
  })
}

// .statics : model method
UserSchema.statics.findByToken = function(token) {
  const User = this
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch(e) {
    return Promise.reject('authentication failed')
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this
  const user = await User.findOne({ email })

  if (!user) {
    return Promise.reject()
  }

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      res ? resolve(user) : reject()
    })
  })
}

UserSchema.pre('save', function(next) {
  const user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }