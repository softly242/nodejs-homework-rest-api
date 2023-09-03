const express = require("express");
const router = express.Router();
const controller = require('../../controllers/auth')
const controllerWrapper = require('../../helpers/controllerWrapper')
const validateBody = require('../../middlewares/validateBody')
const schemas = require('../../schemas/auth')

router.post('/register', validateBody(schemas.registerSchema), controllerWrapper(controller.registration))
router.post('/login', validateBody(schemas.loginSchema), controllerWrapper(controller.login))


module.exports = router