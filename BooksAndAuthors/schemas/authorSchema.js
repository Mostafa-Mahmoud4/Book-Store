const Joi = require('joi');

const authorSchema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().allow(null, ''),
    birthDate: Joi.date().allow(null, '')
});

module.exports = { authorSchema };
