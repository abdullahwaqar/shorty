const monk = require('monk');
const connectionURI = require('../config/keys').mongoURI;

const db = monk(connectionURI);

module.exports = db;