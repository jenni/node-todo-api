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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')

module.exports = { mongoose }