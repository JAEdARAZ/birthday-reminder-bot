import * as Joi from "joi";

export const schema =
  Joi.object({
    body: Joi.object({
      birthday: Joi.string().required(),
      name: Joi.string().required()
    }).required()
  }).unknown(true)