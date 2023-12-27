const Joi = require("joi");

//+++++++++++++++++++(listing schema validation)++++++++++++++++++++++++++

const listingSchema = Joi.object({
  listing: Joi.object({
    name: Joi.string().max(25).required().trim().min(3).messages({
      "string.base": "Name should be a string",
      "string.empty": "Name is required",
      "string.min": "Name should atleast have {#limit} characters",
      "string.max": "Name should not exceed {#limit} characters",
      "any.required": "Name is required",
    }),

    description: Joi.string().required().trim().min(50).messages({
      "string.base": "Description should be a string",
      "string.empty": "Description is required",
      "string.min": "Description should atleast have {#limit} characters",
      "any.required": "Description is required",
    }),

    image: Joi.string().allow("", null),

    quality: Joi.string().required().trim().min(50).messages({
      "string.base": "Quality should be a string",
      "string.min": "Quality should atleast have {#limit} characters",
      "string.empty": "Quality is required",
      "any.required": "Quality is required",
    }),
  }).required(),
}).required();

//+++++++++++++++++++(review schema validation)++++++++++++++++++++++++++
const reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required().trim().min(50).messages({
      "string.base": "comment should be a string",
      "string.empty": "comment is required",
      "string.min": "Your sharing should atleast have {#limit} characters",
      "any.required": "comment is required",
    }),
  }).required(),
}).required();

//++++++++++++++++++++(let export our listing schema)+++++++++++++++++++++++
module.exports = { listingSchema, reviewSchema };
