const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

// ({}) removes everything
Todo.remove({})
  .then(res => console.log(res));

// Gets the removed data back
Todo.findByIdAndRemove("5ae80f07ecab5d30d5a6567c")
  .then(res => console.log(res))

Todo.findOneAndRemove({ _id: "5ae80f07ecab5d30d5a6567c" })
