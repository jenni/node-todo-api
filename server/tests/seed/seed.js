const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { Todo } = require('./../../models/todo')
const { User } = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [
  {
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
  }
]

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo'
  }
]

const populateTodos = async () => {
  await Todo.remove({})
  return Todo.insertMany(todos)
}

const populateUsers = async () => {
  await User.remove({})
  const userOne = new User(users[0]).save()
  const userTwo = new User(users[1]).save()

  return Promise.all([ userOne, userTwo ])
}

module.exports = { todos, populateTodos, users, populateUsers }