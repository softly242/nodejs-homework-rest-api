const Joi = require('joi')

const contactsUpdSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
})

const contactsSchema = Joi.object({
  name: Joi.string().required().messages({
   "any.required": `Missing required name field`,
 }),

 email: Joi.string().required().messages({
   "any.required": `Missing required email field`,
 }),

 phone: Joi.string().required().messages({
   "any.required": `Missing required phone field`,
 }),
 favorite: Joi.boolean(),
});

const favoriteUpdSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `Missing required favorite field`,
  }),
});

module.exports = { contactsSchema, contactsUpdSchema, favoriteUpdSchema }