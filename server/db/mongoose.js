/**
 * Mongoose validators:
 * http://mongoosejs.com/docs/validation.html
 * 
 * Schema:
 * http://mongoosejs.com/docs/guide.html
 * 
 */

const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

module.exports = { mongoose }


// heroku: process.env.NODE_ENV === 'production'

// local: process.env.NODE_ENV === 'development'

// test: process.env.NODE_ENV === 'test'

