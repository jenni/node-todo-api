const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  const db = client.db('TodoApp')

  if (err) {
    console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  // delete many
  db.collection('Todos').deleteMany({
    text: 'eat lunch'
  }).then((result) => {
    console.log(result)
  })

  // delete one
  db.collection('Todos').deleteOne({
    text: 'eat lunch'
  }).then((result) => {
    console.log(result)
  })

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({ completed: false })
    .then((result) => {
      console.log(result)
    })

  // delete many
  db.collection('Users').deleteMany({ name: 'Jen' })

  // find one delete by id
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5ac1c7ad8d32fbc805355a69')
  }).then((result) => console.log(result))
  
  client.close()
})