const express = require('express')
const router = express.Router()
const userController = require('../../controllers/users')
const { validateToken } = require('../../middlewares')
const { controllerWrapper } = require('../../helpers')
const schemas = require('../../schemas/auth')
const validateBody = require('../../middlewares/validateBody')

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

router.patch(
  "/",
  validateToken,
  validateBody(schemas.subSchema),
  controllerWrapper(userController.updateSubscriptionUser)
);

module.exports = router