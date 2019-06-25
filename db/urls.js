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

async function create(shortyUrl) {
    const result = Joi.validate(shortyUrl, schema);

    //? result.error === null
    if (result.error === null) {
        const url = await urls.findOne({
            name: shortyUrl.name
        });
        if (!url) {
            return urls.insert(shortyUrl);
        } else {
            return Promise.reject({
                isJoi: true,
                details: [{
                    message: 'Shorty.cool name already exists. Try being more Cool!'
                }]
            });
        }
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create
};