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


  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      console.log('Unable to insert todo', err)
    }

    console.log(JSON.stringify(result.ops, undefined, 2))
  })

  // Insert new doc into Users collection (name, age, location)

  db.collection('Users').insertOne({
    name: 'Jen',
    age: 31
  }, (err, result) => {
    if (err) console.log(err)
    console.log(JSON.stringify(result.ops, undefined, 2))
  })

  db.collection('Bikes').insertOne({
    brand: 'BH'
  }, (err, res) => {
    if (err) console.log(err)
    console.log(JSON.stringify(res.ops, undefined, 2))
    console.log(res.ops[0]._id.getTimestamp())
  })

  client.close()
})

