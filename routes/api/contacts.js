const express = require("express");

const contactsController = require("../../controllers/contacts");

const controllerWrapper = require("../../helpers/controllerWrapper");

const schema = require("../../schemas/contacts");

const { validateBody,   isValidIdFunc } = require("../../middlewares");

const router = express.Router();

router.get("/", controllerWrapper(contactsController.listContacts));

router.get("/:id",   isValidIdFunc, controllerWrapper(contactsController.getContactById));

router.post(
  "/",
  validateBody(schema.contactsSchema),
  controllerWrapper(contactsController.addContact)
);

router.put(
  "/:id",
  validateBody(schema.contactsUpdSchema),  isValidIdFunc,
  controllerWrapper(contactsController.updateContact)
);

router.patch("/:id/favorite",   isValidIdFunc, validateBody(schema.favoriteUpdSchema), controllerWrapper(contactsController.updateFavorite));

router.delete("/:id",   isValidIdFunc, controllerWrapper(contactsController.removeContact));

module.exports = router;
