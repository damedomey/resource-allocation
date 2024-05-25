const { JsonDB, Config } = require('node-json-db');
const path = require("path");

let database = new JsonDB(new Config(path.join(__dirname, "..", "data", "database.json"), true, true, '/'));

module.exports = database