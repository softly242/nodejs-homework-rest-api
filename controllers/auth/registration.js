const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { RequestError } = require('../../helpers')

const registration = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is already registered");
  }
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  const result = await User.create({
    ...req.body,
    password: hashedPassword,
  })

  return res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}

    
module.exports = registration