const Joi = require('@hapi/joi');

/**
 * Add schema
 */
const assetsValidator = {
  body: Joi.object()
    .required()
    .keys({
      coordinates: Joi.object()
        .keys({
          coordinates: Joi.array()
            .items(Joi.number().required())
            .length(2)
            .required(),
          type: Joi.string()
            .required()
            .valid('Point')
        })
        .required(),
      is_active: Joi.boolean().required(),
      duration: Joi.number().required(),
      worker_id: Joi.string().required()
    })
};
const clientValidator = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
    })
};
const reportValidator = {
  query: Joi.object()
    .required()
    .keys({
      page: Joi.number()
        .integer()
        .min(1)
        .optional(),
      limit: Joi.number()
        .integer()
        .min(1)
        .optional(),
      clientId: Joi.string().optional(),
      siteId: Joi.string().optional()
    })
};
const siteValidator = {
  body: Joi.object()
    .required()
    .keys({
      clientId: Joi.string().required(),
      name: Joi.string().required(),
      coordinates: Joi.array()
        .items(Joi.number().required())
        .length(2)
        .required(),
      timezone: Joi.string().required(),
      startingHour: Joi.number().required(),
      endingHour: Joi.number().required(),
      lateThresholdHour: Joi.number().required(),
      totalInactiveHours: Joi.number().required()
    })
};
const workerValidator = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      clientId: Joi.string().required(),
      siteId: Joi.string().required()
    })
};
module.exports = {
  assetsValidator,
  clientValidator,
  reportValidator,
  siteValidator,
  workerValidator
};
