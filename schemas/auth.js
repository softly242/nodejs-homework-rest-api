const joi = require("joi");

const emailVal = /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/;


const registerSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),

  email: joi.string().pattern(emailVal).required().messages({
    "any.required": `Missing required email field`,
  }),

  password: joi.string().required().messages({
    "any.required": `Missing required password field`,
  }),

});

const loginSchema = joi.object({
  email: joi.string().pattern(emailVal).required().messages({
    "any.required": `Missing required email field`,
  }),

  password: joi.string().required().messages({
    "any.required": `Missing required password field`,
  }),

});

const subSchema = joi.object({
  subscription: joi.string().valid("starter", "pro", "business"),
});

module.exports = {
    registerSchema,
  loginSchema,
  subSchema
};