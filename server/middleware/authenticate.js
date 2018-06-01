const { User } = require('./../models/user')

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('x-auth') // get the value
    const userRecord = await User.findByToken(token)

    if (!userRecord) {
      return Promise.reject()
    }

    req.user = userRecord
    req.token = token
    next()
  } catch(e) {
    res.status(401).send(e)
  }
}

module.exports = { authenticate }