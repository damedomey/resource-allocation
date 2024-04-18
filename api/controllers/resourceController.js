const fs = require("fs");

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
    // Get request body
    const resource = req.body;
    console.log(resource);
}

module.exports = {createResource, getForm}