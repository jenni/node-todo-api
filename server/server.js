const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  try {
    const todoRecord = await todo.save()
    res.status(200).send(todoRecord)
  } catch(e) {
    res.status(400).send(e)
  }
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.send({ todos })
  } catch(e) {
    res.status(400).send(e)
  }
})

// "5ae1f66cad5c2c134b4af8e7"

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id

  try {
    const todo = await Todo.findById(id)

    if (!todo) {
      return res.status(404).send() // 404 Not found
    }
    res.status(200).send({ todo })
  } catch(e) {
    res.status(400).send() // 400 Bad Request (id not valid)
  }
})


app.listen(3000, () => {
  console.log('Listening on port 3000...')
})

module.exports = { app }