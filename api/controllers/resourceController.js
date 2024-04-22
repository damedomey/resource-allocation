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
    const min = 1000000000;
    const max = 9999999999;
    resource.id = Math.round(Math.random() * (max - min) + min);

    await database.push("/resources[]", resource);
    res.send(resource);
}

const getAllResources = async (req, res) => {
    const resources = await database.getData("/resources");
    res.send(resources);
}

const deleteResource = async (req, res) => {
    const resourceId = req.params.id;
    const index = await database.getIndex(`/resources`, resourceId, "id");
    await database.delete(`/resources[${index}]`);
    res.send({id: resourceId});
}

module.exports = {createResource, getForm, getAllResources, deleteResource}