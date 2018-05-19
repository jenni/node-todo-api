require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()
const port = process.env.PORT

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

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id

  try {
    const todo = await Todo.findByIdAndRemove(id)

    if (!todo) {
      return res.status(400).send('resource not found')
    }

    res.status(200).send({ todo })
  } catch(e) {
    res.status(400).send('something went wrong')
  }
})

app.patch('/todos/:id', async (req, res) => {
  const id = req.params.id
  const body = _.pick(req.body, ['text', 'completed'])

  try {
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }


    const todo = await Todo.findByIdAndUpdate(
                            id,
                            { $set: body },
                            { new: true }
                          )

    
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  } catch(e) {
    res.status(404).send('something went wrong')
  }
              
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

module.exports = { app }