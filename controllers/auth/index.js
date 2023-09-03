const login = require('./login')
const registration = require('./registration')
const authTest = require('../../tests/auth.test')
const verifyEmail = require('./verifyEmail')
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
  registration,
  login,
  authTest,
  verifyEmail,
  resendVerifyEmail
}