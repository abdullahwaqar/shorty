const Joi = require('@hapi/joi');
const db = require('./connection');

const urls = db.get('urls');

//* Define validation schema
const schema = Joi.object().keys({
    name: Joi.string().token().min(1).max(100).required(),
    url: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
}).with('name', 'url');

function create(shortyUrl) {
    const result = Joi.validate(shortyUrl, schema);

    //? result.error === null
    if (result.error === null) {
        return urls.insert(shortyUrl);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create
};