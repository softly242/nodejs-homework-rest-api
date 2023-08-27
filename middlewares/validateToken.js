const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { RequestError } = require('../helpers')
require('dotenv').config()
const { JWT_SECRET } = process.env


const validateToken = async (req, res, next) => {
  console.log(req.headers);
  const authorizationHeader = req.headers.authorization || ''
 
  const [type, token] = authorizationHeader.split(' ')

  if (type !== 'Bearer') {
    throw RequestError(401, 'Not authorized')
  }

  if (!token) {
    throw RequestError(401, 'Not authorized')
  }

  try {
    const{ id } = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(id)
    req.user = user
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw RequestError(401, 'Token expired')
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw RequestError(401, 'Invalid token')
    }
  }

  next()
}

module.exports = validateToken