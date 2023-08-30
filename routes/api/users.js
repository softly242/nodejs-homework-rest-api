const express = require('express')
const router = express.Router()
const userController = require('../../controllers/users')
const { validateToken, upload , validateBody } = require('../../middlewares')
const { controllerWrapper } = require('../../helpers')
const schemas = require('../../schemas/auth')


router.get(
  '/current',
  controllerWrapper(validateToken),
  controllerWrapper(userController.getCurrent)
)

router.post(
  '/logout',
  controllerWrapper(validateToken),
  controllerWrapper(userController.logout)
)

router.patch(
  "/subscription",
  controllerWrapper(validateToken),
  validateBody(schemas.subSchema),
  controllerWrapper(userController.updateSubscriptionUser)
);

router.patch(
  "/avatars",
  controllerWrapper(validateToken),
  upload.single("avatars"),
  controllerWrapper(userController.updateAvatar)
);

module.exports = router