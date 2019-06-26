const monk = require('monk');
const nconf = require('nconf');

nconf.argv().env().file('config/keys.json');

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');
const dbName = nconf.get('mongoDatabase');

let connectionURI = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;

const db = monk(connectionURI);

module.exports = db;