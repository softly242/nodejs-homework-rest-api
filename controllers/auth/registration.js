const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { RequestError, sendEmail } = require('../../helpers')
const gravatar = require("gravatar");
const { nanoid } = require('nanoid');

const registration = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is already registered");
  }
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid(50);

  await sendEmail({ name, email, token: verificationToken });

  const result = await User.create({
    ...req.body,
    password: hashedPassword,
    verificationToken,
    avatarURL
  })

  return res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}

    
module.exports = registration