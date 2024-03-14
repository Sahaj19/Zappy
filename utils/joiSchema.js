const Joi = require("joi");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(listing schema validation)

const listingSchema = Joi.object({
  listing: Joi.object({
    name: Joi.string().max(25).required().trim().min(3).messages({
      "string.base": "Toy's name should be a string",
      "string.empty": "Toy's name is required",
      "string.min": "Toy's name should atleast have {#limit} characters",
      "string.max": "Toy's name should not exceed {#limit} characters",
      "any.required": "Toy's name is required",
    }),

    description: Joi.string().required().trim().min(50).messages({
      "string.base": "Toy's description should be a string",
      "string.empty": "Toy's description is required",
      "string.min": "Toy's description should atleast have {#limit} characters",
      "any.required": "Toy's description is required",
    }),

    image: Joi.string().allow("", null),

    quality: Joi.string().required().trim().min(50).messages({
      "string.base": "Toy's quality should be a string",
      "string.min": "Toy's quality should atleast have {#limit} characters",
      "string.empty": "Toy's quality is required",
      "any.required": "Toy's quality is required",
    }),
  }).required(),
}).required();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review schema validation)
const reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required().trim().min(50).messages({
      "string.base": "Your special moment should be a string",
      "string.empty": "Your special moment is required",
      "string.min":
        "Your special moment should atleast have {#limit} characters",
      "any.required": "Your special moment is required",
    }),
  }).required(),
}).required();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(let's export our schemas)
module.exports = { listingSchema, reviewSchema };
