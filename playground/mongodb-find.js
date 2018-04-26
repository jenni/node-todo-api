// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

const obj = new ObjectID()
console.log(obj)

const user = { name: 'jen', age: 31 }
const { name } = user
console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp')
  
  if (err) {
    console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  db.collection('Todos').find({ completed: false }).toArray()
  .then((docs) => {
    console.log('Todos')
    console.log(JSON.stringify(docs, undefined, 2))
  }, err => {
    console.log('Unable to find todos', err)
  })

  db.collection('Todos').find({
    _id: new ObjectID('5ac1c72441e3ccc72c32f55a')
  }).toArray()
    .then((docs) => {
      console.log('Todos')
      console.log(JSON.stringify(docs, undefined, 2))
    }, err => {
      console.log('Unable to find todos', err)
    })

  db.collection('Todos').find().count()
    .then((count) => {
      console.log(`Count: ${count}`)
    }, err => {
      console.log('Unable to find todos', err)
    })

  db.collection('Users').find({
    name: 'Andrew'
  }).toArray()
    .then((res) => {
      console.log(JSON.stringify(res, undefined, 2))
    }, err => console.log('No record found'))

  client.close()
})