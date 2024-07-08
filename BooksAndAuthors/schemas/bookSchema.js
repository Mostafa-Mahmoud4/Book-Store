const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    publishedDate: Joi.date().default(Date.now) 
});

module.exports = { bookSchema };
