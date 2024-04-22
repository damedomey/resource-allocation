const fs = require("fs");
const database = require('../config/database.js');

const getForm = async (req, res) => {
    fs.readFile('data/registration-form.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const form = JSON.parse(data);

        res.send(form);
    })
}

const createResource = async (req, res) => {
    const resource = req.body;
    resource.id = Math.random().toString(36);
    await database.push("/resources[]", resource);
    res.send(resource);
}

module.exports = {createResource, getForm}