import * as Joi from "joi";

export const schema =
  Joi.object({
    birthday: Joi.string()
      .regex(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/]\d{4}$/)
      .message("body.birthday invalid. Correct date format to: DD/MM/YYYY")
      .required(),
    name: Joi.string().required()
  }).unknown(true)