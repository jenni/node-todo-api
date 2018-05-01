const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

const id = "7ae1f66cad5c2c134b4af8e7"

if (!ObjectID.isValid(id)) {
  console.log('ID not valid')
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('todos', todos)
})

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('todo', todo)
})

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found')
  }
  console.log('Todo by Id', todo)
}).catch((e) => {
  console.log(e)
})

// const id = "5ae0e218019058c497933863"

// User.findById(id).then((user) => {
//   if (!user) {
//     return console.log(`User with id ${id} not found`)
//   }
//   console.log('User by Id', user)
// }, (e) => {
//   console.log(e)
// })