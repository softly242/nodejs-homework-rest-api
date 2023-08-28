const User = require('../../models/user')
const { RequestError } = require('../../helpers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne( { email }, "-createdAt -updatedAt" )

  if (!user) {
    throw RequestError(401, 'Email or password is wrong')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw RequestError(401, 'Email or password is wrong')
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '23h',
  });
  await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
}


module.exports = login