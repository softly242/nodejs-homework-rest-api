const express = require("express");

const contactsController = require("../../controllers/contacts");

const controllerWrapper = require("../../helpers/controllerWrapper");

const schema = require("../../schemas/contacts");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", controllerWrapper(contactsController.listContacts));

router.get("/:id", controllerWrapper(contactsController.getContactById));

router.post(
  "/",
  validateBody(schema.contactsSchema),
  controllerWrapper(contactsController.addContact)
);

router.put(
  "/:id",
  validateBody(schema.contactsUpdSchema),
  controllerWrapper(contactsController.updateContact)
);

router.delete("/:id", controllerWrapper(contactsController.removeContact));

module.exports = router;
