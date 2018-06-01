const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

const hashedPassword = '$2a$10$tJLIA32WA7uuUe5bjC0t8uYB1FHtnA69/OG9lMeencAsQxyArR7OO'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})