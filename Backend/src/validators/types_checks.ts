import Joi from "joi";

// Schema for person details
export const perSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
});

// Schema for updating person name
export const updateSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().required(),
});

// Schema for adding group
export const addSchema = Joi.object({
  big_group: Joi.string().required(),
  small_group: Joi.string().required(),
});

// Schema for searching by person name and group name
export const searchSchema = Joi.object({
  person_name: Joi.string().required(),
  group_name: Joi.string().required(),
});
