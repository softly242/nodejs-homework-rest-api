const express = require('express')
const router = express.Router()
const userController = require('../../controllers/users')
const { validateToken } = require('../../middlewares')
const { controllerWrapper } = require('../../helpers')

router.get(
  '/current',
  controllerWrapper(validateToken),
  controllerWrapper(userController.getCurrent)
)

router.post(
  '/logout',
  validateToken,
  controllerWrapper(userController.logout)
)

module.exports = router