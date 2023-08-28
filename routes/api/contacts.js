const express = require("express");

const contactsController = require("../../controllers/contacts");

const controllerWrapper = require("../../helpers/controllerWrapper");

const schema = require("../../schemas/contacts");

const { validateBody,   isValidIdFunc, validateToken } = require("../../middlewares");

const router = express.Router();

router.get("/",  validateToken, controllerWrapper(contactsController.listContacts));

router.get("/:id",  validateToken,  isValidIdFunc, controllerWrapper(contactsController.getContactById));

router.post(
  "/",
  validateToken, validateBody(schema.contactsSchema),
  controllerWrapper(contactsController.addContact)
);

router.put(
  "/:id",
  validateToken, validateBody(schema.contactsUpdSchema),  isValidIdFunc,
  controllerWrapper(contactsController.updateContact)
);

router.patch("/:id/favorite",   validateToken, isValidIdFunc, validateBody(schema.favoriteUpdSchema), controllerWrapper(contactsController.updateFavorite));

router.delete("/:id",  validateToken,  isValidIdFunc, controllerWrapper(contactsController.removeContact));

module.exports = router;
