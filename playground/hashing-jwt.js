// JSON web token: JWT

const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

// jwt.sign
// jwt.verify

const data = {
  id: 10
}

const token = jwt.sign(data, '123abc')

console.log('===token==',token)

const decoded = jwt.verify(token, '123abc')

console.log('==decoded==', decoded)

const manipulated = jwt.verify(token + 'lala', '123abc')

console.log('==manipulated==', manipulated)