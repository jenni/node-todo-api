const { MongoClient, ObjectID } = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp')

  if (err) {
    console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  // findOneAndUpdate(filter, update, options, callback)
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5ae0c4d07251592810e870c0"),
  }, {
    $set: { completed: true }
  }, {
    returnOriginal: false
  }).then((result) => console.log(result))

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5ac1c85957ea99c8f37d1625")
  }, {
    $set: { name: 'Lola' },
    $inc: { age: 1 }
  }, {
    returnOriginal: false
  }).then((result) => console.log(result))

  client.close()
})